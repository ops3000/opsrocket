//! Smoke-test: every example `.ork` shipped by upstream OpenRocket must parse
//! without errors and yield at least one stage with at least one body component.

use std::path::PathBuf;

fn fixtures_dir() -> PathBuf {
    PathBuf::from(env!("CARGO_MANIFEST_DIR"))
        .parent()
        .unwrap()
        .parent()
        .unwrap()
        .join("tests/fixtures/examples")
}

#[test]
fn parse_all_examples() {
    let dir = fixtures_dir();
    let entries: Vec<_> = std::fs::read_dir(&dir)
        .expect("examples dir")
        .filter_map(|e| e.ok())
        .filter(|e| e.path().extension().and_then(|s| s.to_str()) == Some("ork"))
        .collect();
    assert!(!entries.is_empty(), "no .ork fixtures found in {}", dir.display());

    let mut failures = Vec::new();
    for entry in &entries {
        let path = entry.path();
        match opsrocket_io::read_ork(&path) {
            Ok(doc) => {
                if doc.rocket.stages.is_empty() {
                    failures.push(format!("{}: no stages parsed", path.display()));
                    continue;
                }
                let total_children: usize = doc.rocket.stages.iter().map(|s| s.children.len()).sum();
                if total_children == 0 {
                    failures.push(format!("{}: no children parsed", path.display()));
                }
            }
            Err(e) => failures.push(format!("{}: {}", path.display(), e)),
        }
    }
    assert!(failures.is_empty(), "failures:\n  {}", failures.join("\n  "));
}

#[test]
fn simple_model_rocket_has_cached_flightdata() {
    let path = fixtures_dir().join("A simple model rocket.ork");
    let doc = opsrocket_io::read_ork(&path).expect("parse");
    assert!(!doc.simulations.is_empty(), "expected at least one <simulation>");
    let cached = doc.simulations[0].cached.as_ref().expect("cached flight data");
    assert!(cached.points.len() > 10, "expected >10 datapoints, got {}", cached.points.len());
    // 58 default FlightDataType columns in OpenRocket 24.12 (see PORTING_NOTES.md).
    assert_eq!(cached.column_types.len(), 58, "expected 58 column types");
    assert_eq!(cached.column_types[0], "Time");
    assert_eq!(cached.column_types[1], "Altitude");
    // First column is time, must be monotonically non-decreasing
    let mut prev = -1.0;
    for p in &cached.points {
        let t = p.values[0];
        assert!(t >= prev - 1e-9, "time went backwards: {} -> {}", prev, t);
        prev = t;
    }
}
