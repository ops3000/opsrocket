//! `opsrocket` command-line driver.

use std::path::PathBuf;

use anyhow::Result;
use clap::{Parser, Subcommand};

#[derive(Parser)]
#[command(name = "opsrocket", about = "OpsRocket simulator", version)]
struct Cli {
    #[command(subcommand)]
    cmd: Cmd,
}

#[derive(Subcommand)]
enum Cmd {
    /// Run the default simulation configuration from a .ork file.
    Simulate {
        /// Path to the .ork file.
        input: PathBuf,
        /// Output CSV path. If omitted, writes to stdout.
        #[arg(long)]
        csv: Option<PathBuf>,
        /// Name of the simulation to run (defaults to the first defined).
        #[arg(long)]
        name: Option<String>,
        /// Directory containing motor `.eng` files. Searched in addition to
        /// `tests/fixtures/motors/` and `$HOME/.opsrocket/motors`.
        #[arg(long)]
        motors_dir: Option<PathBuf>,
    },
    /// Print the rocket structure from a .ork file.
    Inspect {
        input: PathBuf,
    },
    /// Dump the cached `<datapoint>` reference flight data embedded in a .ork.
    DumpReference {
        input: PathBuf,
        #[arg(long)]
        csv: Option<PathBuf>,
        #[arg(long)]
        index: Option<usize>,
    },
    /// Compare a Rust simulation against the cached <datapoint> reference and
    /// print a column-by-column error report sorted by severity.
    Diff {
        input: PathBuf,
        #[arg(long)]
        motors_dir: Option<PathBuf>,
        #[arg(long, default_value_t = 0)]
        index: usize,
        /// Show this many top-error columns (default 20).
        #[arg(long, default_value_t = 20)]
        top: usize,
    },
}

fn main() -> Result<()> {
    let cli = Cli::parse();
    match cli.cmd {
        Cmd::Simulate { input, csv, name, motors_dir } => cmd_simulate(input, csv, name, motors_dir),
        Cmd::Inspect { input } => cmd_inspect(input),
        Cmd::DumpReference { input, csv, index } => cmd_dump_reference(input, csv, index),
        Cmd::Diff { input, motors_dir, index, top } => cmd_diff(input, motors_dir, index, top),
    }
}

fn cmd_simulate(
    input: PathBuf,
    csv: Option<PathBuf>,
    name: Option<String>,
    motors_dir: Option<PathBuf>,
) -> Result<()> {
    let doc = opsrocket_io::read_ork(&input)?;
    let sim_name = name
        .clone()
        .or_else(|| doc.simulations.first().map(|s| s.name.clone()))
        .unwrap_or_else(|| "Simulation 1".to_string());
    let result = opsrocket_sim::engine::simulate_with(&doc, &sim_name, motors_dir.as_deref())?;
    match csv {
        Some(path) => {
            let mut f = std::fs::File::create(&path)?;
            opsrocket_sim::write_csv(&mut f, &result)?;
        }
        None => {
            let mut out = std::io::stdout().lock();
            opsrocket_sim::write_csv(&mut out, &result)?;
        }
    }
    Ok(())
}

fn cmd_inspect(input: PathBuf) -> Result<()> {
    let doc = opsrocket_io::read_ork(&input)?;
    println!("Rocket: {}", doc.rocket.name);
    if let Some(d) = &doc.rocket.designer {
        println!("Designer: {}", d);
    }
    println!("Stages: {}", doc.rocket.stages.len());
    for (i, stage) in doc.rocket.stages.iter().enumerate() {
        println!("  [{}] {}  ({} children)", i, stage.common.name, stage.children.len());
    }
    println!("Configurations:");
    for cfg in &doc.rocket.configurations {
        println!("  - {} {}", cfg.config_id, cfg.name.as_deref().unwrap_or(""));
    }
    println!("Simulations: {}", doc.simulations.len());
    for s in &doc.simulations {
        println!("  - {}", s.name);
    }
    Ok(())
}

fn cmd_diff(input: PathBuf, motors_dir: Option<PathBuf>, index: usize, top: usize) -> Result<()> {
    let doc = opsrocket_io::read_ork(&input)?;
    let sim = doc.simulations.get(index).ok_or_else(|| {
        anyhow::anyhow!("no simulation index {} (only {} present)", index, doc.simulations.len())
    })?;
    let cached = sim.cached.as_ref().ok_or_else(|| {
        anyhow::anyhow!("simulation `{}` has no cached <flightdata>", sim.name)
    })?;
    let result = opsrocket_sim::engine::simulate_with(&doc, &sim.name, motors_dir.as_deref())?;
    let column_names = cached.column_types.clone();

    let expected: Vec<Vec<f64>> = cached.points.iter().map(|p| p.values.clone()).collect();
    let actual: Vec<Vec<f64>> = result.rows.iter().map(|r| r.to_vec()).collect();

    // Resample the Rust output onto the reference's time grid for column-wise diff.
    let resampled = resample_onto(&expected, &actual);

    // Per-column max abs, mean abs, RMS, max rel.
    let cols = column_names.len();
    let mut max_abs = vec![0.0_f64; cols];
    let mut sum_abs = vec![0.0_f64; cols];
    let mut sum_sq = vec![0.0_f64; cols];
    let mut max_rel = vec![0.0_f64; cols];
    let mut counts = vec![0_usize; cols];

    let rows = expected.len().min(resampled.len());
    for row in 0..rows {
        for col in 0..cols.min(expected[row].len()).min(resampled[row].len()) {
            let e = expected[row][col];
            let a = resampled[row][col];
            if e.is_nan() || a.is_nan() {
                continue;
            }
            let abs = (e - a).abs();
            let denom = e.abs().max(a.abs()).max(1e-12);
            let rel = abs / denom;
            if abs > max_abs[col] { max_abs[col] = abs; }
            if rel > max_rel[col] { max_rel[col] = rel; }
            sum_abs[col] += abs;
            sum_sq[col] += abs * abs;
            counts[col] += 1;
        }
    }

    let mut rows_sorted: Vec<usize> = (0..cols).collect();
    rows_sorted.sort_by(|&a, &b| max_rel[b].partial_cmp(&max_rel[a]).unwrap_or(std::cmp::Ordering::Equal));

    println!("OpsRocket vs cached reference — {} rows compared", rows);
    println!("");
    println!(
        "  {:>3}  {:<35}  {:>11}  {:>11}  {:>11}  {:>11}",
        "col", "column name", "max abs", "mean abs", "rms", "max rel"
    );
    println!("  ---  -----------------------------------  -----------  -----------  -----------  -----------");
    for &i in rows_sorted.iter().take(top) {
        let n = counts[i] as f64;
        let mean = if counts[i] > 0 { sum_abs[i] / n } else { 0.0 };
        let rms = if counts[i] > 0 { (sum_sq[i] / n).sqrt() } else { 0.0 };
        println!(
            "  {:>3}  {:<35}  {:>11.4e}  {:>11.4e}  {:>11.4e}  {:>11.4e}",
            i + 1, column_names[i], max_abs[i], mean, rms, max_rel[i]
        );
    }
    Ok(())
}

fn resample_onto(expected: &[Vec<f64>], actual: &[Vec<f64>]) -> Vec<Vec<f64>> {
    if actual.is_empty() { return Vec::new(); }
    let cols = actual[0].len();
    let mut out = Vec::with_capacity(expected.len());
    for row in expected {
        let t = row[0];
        out.push(sample_at(actual, t, cols));
    }
    out
}

fn sample_at(actual: &[Vec<f64>], t: f64, cols: usize) -> Vec<f64> {
    if t <= actual.first().unwrap()[0] { return actual.first().cloned().unwrap(); }
    if t >= actual.last().unwrap()[0] { return actual.last().cloned().unwrap(); }
    for w in actual.windows(2) {
        let t0 = w[0][0];
        let t1 = w[1][0];
        if t >= t0 && t <= t1 {
            let f = if t1 - t0 > 0.0 { (t - t0) / (t1 - t0) } else { 0.0 };
            let mut out = Vec::with_capacity(cols);
            for col in 0..cols {
                let a = w[0][col];
                let b = w[1][col];
                if a.is_nan() || b.is_nan() {
                    out.push(f64::NAN);
                } else {
                    out.push(a + f * (b - a));
                }
            }
            return out;
        }
    }
    actual.last().cloned().unwrap()
}

fn cmd_dump_reference(input: PathBuf, csv: Option<PathBuf>, index: Option<usize>) -> Result<()> {
    let doc = opsrocket_io::read_ork(&input)?;
    let idx = index.unwrap_or(0);
    let sim = doc.simulations.get(idx).ok_or_else(|| {
        anyhow::anyhow!("no simulation index {} (only {} present)", idx, doc.simulations.len())
    })?;
    let branch = sim.cached.as_ref().ok_or_else(|| {
        anyhow::anyhow!("simulation `{}` has no cached <flightdata>", sim.name)
    })?;
    let mut writer: Box<dyn std::io::Write> = match csv {
        Some(p) => Box::new(std::fs::File::create(p)?),
        None => Box::new(std::io::stdout().lock()),
    };
    writeln!(writer, "{}", branch.column_types.join(","))?;
    for point in &branch.points {
        let row = point
            .values
            .iter()
            .map(|v| if v.is_nan() { String::from("NaN") } else { format!("{}", v) })
            .collect::<Vec<_>>()
            .join(",");
        writeln!(writer, "{}", row)?;
    }
    Ok(())
}
