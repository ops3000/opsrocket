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
}

fn main() -> Result<()> {
    let cli = Cli::parse();
    match cli.cmd {
        Cmd::Simulate { input, csv, name, motors_dir } => cmd_simulate(input, csv, name, motors_dir),
        Cmd::Inspect { input } => cmd_inspect(input),
        Cmd::DumpReference { input, csv, index } => cmd_dump_reference(input, csv, index),
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
