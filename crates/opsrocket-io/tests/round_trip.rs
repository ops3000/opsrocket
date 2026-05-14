//! Round-trip test: read a `.ork`, write it back, parse the new file, and
//! verify the component tree survives without loss.

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
fn round_trip_simple_model_rocket() {
    let src = fixtures_dir().join("A simple model rocket.ork");
    let original = opsrocket_io::read_ork(&src).expect("parse original");

    let tmp = std::env::temp_dir().join("opsrocket_roundtrip.ork");
    opsrocket_io::write_ork(&tmp, &original).expect("write");

    let reparsed = opsrocket_io::read_ork(&tmp).expect("re-parse");

    // Structure should match: same number of stages and components per stage.
    assert_eq!(reparsed.rocket.stages.len(), original.rocket.stages.len());
    for (i, (s_old, s_new)) in original.rocket.stages.iter().zip(reparsed.rocket.stages.iter()).enumerate() {
        assert_eq!(
            s_old.children.len(),
            s_new.children.len(),
            "stage {} child count changed",
            i
        );
    }

    // Rocket name + designer survives.
    assert_eq!(reparsed.rocket.name, original.rocket.name);
    assert_eq!(reparsed.rocket.designer, original.rocket.designer);

    // Total empty mass should match within tight tolerance (auto-resolved
    // dimensions are recomputed identically).
    let m_old = opsrocket_sim::mass::empty_mass_properties(&original.rocket);
    let m_new = opsrocket_sim::mass::empty_mass_properties(&reparsed.rocket);
    let diff = (m_old.mass - m_new.mass).abs();
    assert!(
        diff < 1e-9,
        "mass changed after round-trip: {} -> {}",
        m_old.mass,
        m_new.mass
    );
    let cg_diff = (m_old.cg_axial - m_new.cg_axial).abs();
    assert!(cg_diff < 1e-9, "CG changed: {} -> {}", m_old.cg_axial, m_new.cg_axial);

    // Simulations are preserved (names match).
    assert_eq!(
        reparsed.simulations.len(),
        original.simulations.len(),
        "simulation count changed"
    );
    for (s_old, s_new) in original.simulations.iter().zip(reparsed.simulations.iter()) {
        assert_eq!(s_old.name, s_new.name);
        assert!((s_old.time_step - s_new.time_step).abs() < 1e-9);
        assert!((s_old.max_time - s_new.max_time).abs() < 1e-9);
    }
}

#[test]
fn round_trip_all_examples_compile() {
    let dir = fixtures_dir();
    let entries: Vec<_> = std::fs::read_dir(&dir)
        .unwrap()
        .filter_map(|e| e.ok())
        .filter(|e| e.path().extension().and_then(|s| s.to_str()) == Some("ork"))
        .collect();
    let tmp_dir = std::env::temp_dir().join("opsrocket_round_trip_all");
    std::fs::create_dir_all(&tmp_dir).unwrap();

    for entry in &entries {
        let path = entry.path();
        let name = path.file_name().unwrap().to_string_lossy().to_string();
        let doc = opsrocket_io::read_ork(&path).unwrap_or_else(|e| panic!("parse {}: {}", name, e));
        let out = tmp_dir.join(&name);
        opsrocket_io::write_ork(&out, &doc).unwrap_or_else(|e| panic!("write {}: {}", name, e));
        let reparsed = opsrocket_io::read_ork(&out).unwrap_or_else(|e| panic!("re-parse {}: {}", name, e));
        assert_eq!(
            reparsed.rocket.stages.len(),
            doc.rocket.stages.len(),
            "{}: stage count diverged",
            name
        );
    }
}
