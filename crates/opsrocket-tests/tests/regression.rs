//! Numerical regression tests: simulate each example `.ork` and compare to
//! the cached `<datapoint>` reference shipped inside the file by upstream
//! OpenRocket.
//!
//! These tests currently report column-wise *maximum absolute error* rather
//! than failing on the first divergence -- the Rust port is still bringing
//! its drag / mass / atmosphere fidelity up to parity with the Java
//! implementation.  The harness exists so each future improvement can be
//! measured.
//!
//! To upgrade a "scoreboard" test into a hard pass/fail assertion, switch the
//! `report_only` flag to `false` in the relevant fixture entry.

use opsrocket_tests::{
    column_max_errors, default_tolerance, examples_dir, motors_dir, resample_onto,
    tolerance_map, Divergence,
};

struct Fixture {
    file: &'static str,
    /// Whether to assert hard pass/fail on tolerances.
    enforce: bool,
}

const FIXTURES: &[Fixture] = &[
    Fixture { file: "A simple model rocket.ork", enforce: false },
];

#[test]
fn simulate_each_example_runs_without_panic() {
    let mut had_failure = false;
    let entries: Vec<_> = std::fs::read_dir(examples_dir())
        .expect("examples dir")
        .filter_map(|e| e.ok())
        .filter(|e| e.path().extension().and_then(|s| s.to_str()) == Some("ork"))
        .collect();
    for entry in &entries {
        let path = entry.path();
        let name = path.file_name().unwrap().to_string_lossy().to_string();
        let doc = match opsrocket_io::read_ork(&path) {
            Ok(d) => d,
            Err(e) => {
                eprintln!("[parse] {name}: {e}");
                had_failure = true;
                continue;
            }
        };
        let sim_name = match doc.simulations.first() {
            Some(s) => s.name.clone(),
            None => {
                eprintln!("[skip ] {name}: no simulations");
                continue;
            }
        };
        match opsrocket_sim::engine::simulate_with(&doc, &sim_name, Some(&motors_dir())) {
            Ok(r) => {
                println!(
                    "[ok   ] {name}: rows={}, t_apogee≈{:.2}s, alt_max≈{:.2}m, flight_t={:.2}s",
                    r.rows.len(),
                    r.time_to_apogee,
                    r.max_altitude,
                    r.flight_time
                );
            }
            Err(e) => {
                eprintln!("[sim  ] {name}: {e}");
                had_failure = true;
            }
        }
    }
    assert!(!had_failure, "simulation crashed for one or more fixtures (see stderr)");
}

#[test]
fn simple_model_rocket_against_cached_reference() {
    let path = examples_dir().join("A simple model rocket.ork");
    let doc = opsrocket_io::read_ork(&path).expect("parse");
    let sim_name = doc.simulations[0].name.clone();
    let result =
        opsrocket_sim::engine::simulate_with(&doc, &sim_name, Some(&motors_dir())).expect("sim");

    let cached = doc.simulations[0].cached.as_ref().expect("cached <flightdata>");
    let expected: Vec<Vec<f64>> = cached.points.iter().map(|p| p.values.clone()).collect();
    let actual: Vec<Vec<f64>> = result
        .rows
        .iter()
        .map(|r| r.iter().copied().collect())
        .collect();

    // Time-resample our trace onto the expected time grid for column-by-
    // column comparison.
    let resampled = resample_onto(&expected, &actual);
    let column_names = cached.column_types.clone();

    let errors = column_max_errors(&column_names, &expected, &resampled);
    let mut errors_sorted: Vec<_> = errors.into_iter().collect();
    errors_sorted.sort_by(|a, b| b.1.partial_cmp(&a.1).unwrap_or(std::cmp::Ordering::Equal));

    println!("Top 10 column max-abs-errors (expected vs. opsrocket):");
    for (name, err) in errors_sorted.iter().take(10) {
        println!("  {:<32}  {:.4}", name, err);
    }

    // Sanity: at least basic columns must be present + non-empty
    assert!(!resampled.is_empty(), "no rows produced");
    assert_eq!(column_names.len(), 58);

    // Check the fixture's enforce flag.
    let fixture = FIXTURES.iter().find(|f| f.file == "A simple model rocket.ork").unwrap();
    if fixture.enforce {
        let tol = tolerance_map(&column_names);
        if let Some(d) = opsrocket_tests::first_divergence(&column_names, &expected, &resampled, &tol) {
            panic!(
                "regression: column `{}` row {} expected={} actual={}",
                d.column, d.row, d.expected, d.actual
            );
        }
    }
}

#[test]
fn tolerance_column_table_is_populated() {
    let names = vec!["Time".to_string(), "Altitude".to_string(), "Air pressure".to_string()];
    let tol = tolerance_map(&names);
    assert_eq!(tol.len(), 3);
    assert!(tol[0].matches(1.0, 1.0));
    assert!(tol[1].matches(50.0, 50.4));
    assert!(!tol[1].matches(50.0, 100.0));
}

#[allow(dead_code)]
fn unused_imports_silencer() {
    let _ = default_tolerance("Time");
    let _: Option<Divergence> = None;
}
