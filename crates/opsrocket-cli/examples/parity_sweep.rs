// Flight-sim parity sweep: run OpsRocket's dynamic simulation on every
// example .ork and compare the summary scalars + recovery/burnout event
// timing against the OpenRocket reference cached inside each file.
//
// Usage:
//   cargo run -p opsrocket-cli --example parity_sweep
//   cargo run -p opsrocket-cli --example parity_sweep -- tests/fixtures/examples
//
// Columns: OpsRocket value, OpenRocket reference, and % error. A row is
// flagged (!) when apogee or flight-time error > 10%, or the recovery-
// deployment time differs from OpenRocket by > 0.5 s — that isolates the
// descent/recovery problems from the (already-close) ascent.

use std::path::{Path, PathBuf};

fn pct(ops: f64, refv: f64) -> f64 {
    let d = refv.abs().max(1e-9);
    (ops - refv) / d * 100.0
}

// First event time whose kind contains any of `keys` (case-insensitive).
fn ev_time(events: &[(f64, String)], keys: &[&str]) -> Option<f64> {
    events
        .iter()
        .filter(|(_, k)| {
            let k = k.to_lowercase();
            keys.iter().any(|q| k.contains(q))
        })
        .map(|(t, _)| *t)
        .next()
}

fn ev_time_ref(
    events: &[opsrocket_io::ork::FlightEvent],
    keys: &[&str],
) -> Option<f64> {
    events
        .iter()
        .filter(|e| {
            let k = e.kind.to_lowercase();
            keys.iter().any(|q| k.contains(q))
        })
        .map(|e| e.time)
        .next()
}

fn main() {
    let dir: PathBuf = std::env::args()
        .nth(1)
        .unwrap_or_else(|| "tests/fixtures/examples".into())
        .into();
    let motors = Path::new("tests/fixtures/motors");

    let mut files: Vec<PathBuf> = std::fs::read_dir(&dir)
        .expect("examples dir")
        .filter_map(|e| e.ok())
        .map(|e| e.path())
        .filter(|p| p.extension().and_then(|s| s.to_str()) == Some("ork"))
        .collect();
    files.sort();

    println!(
        "{:<42} {:>10} {:>10} {:>7}  {:>9} {:>9} {:>6}  {:>9} {:>8}  {:>9} {:>8}  {}",
        "example",
        "apogee", "OR", "Δ%",
        "maxV", "OR", "Δ%",
        "flight_t", "OR",
        "recov_t", "OR",
        "flag",
    );
    println!("{}", "-".repeat(150));

    let mut flagged = Vec::new();

    for path in &files {
        let name = path.file_stem().unwrap().to_string_lossy().to_string();
        let doc = match opsrocket_io::read_ork(path) {
            Ok(d) => d,
            Err(e) => {
                println!("{name:<42}  PARSE ERROR: {e}");
                flagged.push((name.clone(), format!("parse: {e}")));
                continue;
            }
        };
        let Some(sim) = doc.simulations.first() else {
            println!("{name:<42}  (no simulations)");
            continue;
        };
        let sim_name = sim.name.clone();
        let res = match opsrocket_sim::engine::simulate_with(
            &doc,
            &sim_name,
            Some(motors),
        ) {
            Ok(r) => r,
            Err(e) => {
                println!("{name:<42}  SIM ERROR: {e}");
                flagged.push((name.clone(), format!("sim: {e}")));
                continue;
            }
        };
        let Some(c) = sim.cached.as_ref() else {
            println!(
                "{name:<42} {:>10.1} {:>10} {:>7}  (no OpenRocket reference in file)",
                res.max_altitude, "-", "-"
            );
            continue;
        };

        let ap_e = pct(res.max_altitude, c.max_altitude);
        let mv_e = pct(res.max_velocity, c.max_velocity);
        let ft_e = pct(res.flight_time, c.flight_time);

        let recov = ev_time(&res.events, &["recover", "deploy"]);
        let recov_ref = ev_time_ref(&c.events, &["recover", "deploy"]);
        let recov_d = match (recov, recov_ref) {
            (Some(a), Some(b)) => (a - b).abs(),
            _ => f64::NAN,
        };

        let bad_apogee = ap_e.abs() > 10.0;
        let bad_ft = ft_e.abs() > 10.0;
        let bad_recov = recov_d.is_finite() && recov_d > 0.5;
        let flag = if bad_apogee || bad_ft || bad_recov {
            let mut f = String::from("!");
            if bad_apogee {
                f.push_str(" apogee");
            }
            if bad_ft {
                f.push_str(" flight_t");
            }
            if bad_recov {
                f.push_str(" recovery");
            }
            flagged.push((name.clone(), f.clone()));
            f
        } else {
            String::new()
        };

        let fmt_opt = |o: Option<f64>| {
            o.map(|v| format!("{v:.2}"))
                .unwrap_or_else(|| "-".into())
        };

        println!(
            "{:<42} {:>10.1} {:>10.1} {:>7.1}  {:>9.1} {:>9.1} {:>6.1}  {:>9.2} {:>8.2}  {:>9} {:>8}  {}",
            name,
            res.max_altitude,
            c.max_altitude,
            ap_e,
            res.max_velocity,
            c.max_velocity,
            mv_e,
            res.flight_time,
            c.flight_time,
            fmt_opt(recov),
            fmt_opt(recov_ref),
            flag,
        );
    }

    println!("{}", "-".repeat(150));
    println!("\nFlagged {} / {} examples:", flagged.len(), files.len());
    for (n, why) in &flagged {
        println!("  {n}  —  {why}");
    }
}
