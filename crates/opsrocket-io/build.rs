// Embed the bundled RASP `.eng` motor set into the binary so the flight
// engine works with no filesystem (WASM / browser). Native builds still
// also scan on-disk motor dirs; this is the always-available fallback and
// the sole source under wasm32.
use std::{env, fs, path::PathBuf};

fn main() {
    let motors = PathBuf::from(env!("CARGO_MANIFEST_DIR"))
        .join("../../tests/fixtures/motors");
    let out = PathBuf::from(env::var("OUT_DIR").unwrap()).join("motors_embedded.rs");

    let mut entries: Vec<String> = Vec::new();
    if let Ok(rd) = fs::read_dir(&motors) {
        let mut files: Vec<PathBuf> = rd
            .flatten()
            .map(|e| e.path())
            .filter(|p| p.extension().and_then(|s| s.to_str()) == Some("eng"))
            .collect();
        files.sort();
        for p in files {
            let name = p.file_name().unwrap().to_string_lossy().into_owned();
            let abs = p.canonicalize().unwrap_or(p);
            entries.push(format!(
                "({name:?}, include_str!({:?}))",
                abs.to_string_lossy()
            ));
            println!("cargo:rerun-if-changed={}", abs.display());
        }
    }
    println!("cargo:rerun-if-changed={}", motors.display());

    let body = format!(
        "pub static EMBEDDED_MOTORS: &[(&str, &str)] = &[\n{}\n];\n",
        entries.join(",\n")
    );
    fs::write(&out, body).expect("write motors_embedded.rs");
}
