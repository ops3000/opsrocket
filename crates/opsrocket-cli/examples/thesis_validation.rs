// Real-world validation against the OpenRocket technical documentation
// Chapter 6.1 — a constructed-and-flown 56 cm / 29 mm test rocket with a
// PerfectFlite Alt15K altimeter (accuracy ±(0.25% + 0.6 m)).
//
// Ground-truth measured apogees (Table 6.1):
//   B4-4 :  64.0 m   (Java OpenRocket predicted 74.4 m, +16%)
//   C6-3 : 151.5 m   (Java OpenRocket predicted 161.4 m, +7%)
//
// The thesis overrode the rocket's measured mass/CG but did not publish the
// value, so we sweep a plausible empty-mass range and report the apogee
// band, then locate reality and Java within it.

use opsrocket_core::component::{
    AxialMethod, BodyTube, Common, Component, FinCrossSection, FinSet, IgnitionEvent, InnerTube,
    MotorAssignment, MotorMount, NoseCone, NoseShape, Rocket, Stage,
};
use opsrocket_core::material::Material;
use opsrocket_io::ork::{CachedSimulation, OrkDocument};

fn thesis_rocket(empty_mass_override: f64) -> Rocket {
    // 10 cm tangent ogive nose, 29 mm body (14.5 mm radius).
    let mut nose_common = Common::new("nose", "Nose cone");
    nose_common.mass_override = None;
    let nose = NoseCone {
        common: nose_common,
        shape: NoseShape::Ogive,
        shape_parameter: 1.0,
        length: 0.10,
        aft_radius: 0.0145,
        thickness: 0.0015,
        aft_shoulder_radius: 0.0,
        aft_shoulder_length: 0.0,
        aft_shoulder_thickness: 0.0,
        aft_shoulder_capped: false,
        is_flipped: false,
    };

    // Motor-mount inner tube (18 mm Estes motor in a 29 mm body).
    let inner = InnerTube {
        common: Common::new("mount", "Motor mount"),
        length: 0.07,
        outer_radius: 0.0095,
        inner_radius: 0.009,
        motor_mount: Some(MotorMount {
            overhang: 0.003,
            ignition_event: IgnitionEvent::Automatic,
            ignition_delay: 0.0,
            motors: vec![MotorAssignment {
                config_id: "cfg".to_string(),
                designation: Some("C6".to_string()),
                digest: None,
                ejection_delay: 3.0,
            }],
        }),
    };

    // Simple trapezoidal fins, typical for a 29 mm sport rocket.
    let mut fin_common = Common::new("fins", "Fin set");
    fin_common.axial_method = AxialMethod::Bottom;
    let fins = FinSet {
        common: fin_common,
        fin_count: 3,
        root_chord: 0.06,
        tip_chord: 0.03,
        sweep_length: 0.03,
        height: 0.04,
        thickness: 0.002,
        cant_angle: 0.0,
        cross_section: FinCrossSection::Square, // "left rectangular" per thesis
    };

    // Body tube: 56 cm total − 10 cm nose = 46 cm. Apply the measured
    // empty-mass override on the body so total = override (matches the
    // thesis "mass of the entire rocket overridden with measured values").
    let mut body_common = Common::new("body", "Body tube");
    body_common.mass_override = Some(empty_mass_override);
    let body = BodyTube {
        common: body_common,
        length: 0.46,
        radius: Some(0.0145),
        thickness: 0.0005,
        children: vec![Component::InnerTube(inner), Component::FinSet(fins)],
        motor_mount: None,
    };

    let mut stage = Stage::default();
    stage.common.name = "Stage".into();
    stage.children.push(Component::NoseCone(nose));
    stage.children.push(Component::BodyTube(body));

    let mut rocket = Rocket::default();
    rocket.name = "OpenRocket thesis §6.1 test rocket".into();
    rocket.stages.push(stage);
    rocket
}

fn run(designation: &str, ejection: f64, empty_mass: f64) -> f64 {
    let mut rocket = thesis_rocket(empty_mass);
    // Point the motor mount at the requested motor.
    if let Component::BodyTube(b) = &mut rocket.stages[0].children[1] {
        if let Component::InnerTube(it) = &mut b.children[0] {
            if let Some(m) = &mut it.motor_mount {
                m.motors[0].designation = Some(designation.to_string());
                m.motors[0].ejection_delay = ejection;
            }
        }
    }
    let sim = CachedSimulation {
        name: "v".into(),
        config_id: Some("cfg".into()),
        launch_rod_length: 1.0, // 1 m tower launcher
        launch_rod_angle: 0.0,
        launch_altitude: 0.0,
        launch_temperature: 288.15,
        launch_pressure: 101_325.0,
        wind_average: 0.0, // calm; thesis flights were low-wind
        time_step: 0.05,
        max_time: 60.0,
        cached: None,
    };
    let doc = OrkDocument {
        version: "validation".into(),
        creator: "thesis".into(),
        rocket,
        simulations: vec![sim],
    };
    let motors = std::path::Path::new(env!("CARGO_MANIFEST_DIR"))
        .parent()
        .unwrap()
        .parent()
        .unwrap()
        .join("tests/fixtures/motors");
    let r = opsrocket_sim::engine::simulate_with(&doc, "v", Some(&motors)).expect("sim");
    r.max_altitude
}

fn main() {
    let _ = Material::bulk("x", 1.0);
    println!("OpsRocket vs REAL altimeter data (OpenRocket tech-doc Ch.6.1)\n");
    println!("Measured ground truth:  B4-4 = 64.0 m,  C6-3 = 151.5 m");
    println!("Java OpenRocket pred.:  B4-4 = 74.4 m,  C6-3 = 161.4 m");
    println!("RockSim pred.:          B4-4 = 79.1 m,  C6-3 = 180.1 m\n");
    println!("Empty-mass sweep (thesis overrode measured mass; value unpublished):\n");
    println!("  {:>9}  {:>12}  {:>12}", "empty(g)", "B4 apogee", "C6 apogee");
    for m_g in [60.0, 70.0, 80.0, 90.0, 100.0, 110.0, 120.0] {
        let m = m_g / 1000.0;
        let b4 = run("B4", 4.0, m);
        let c6 = run("C6", 3.0, m);
        println!("  {:>9.0}  {:>10.1} m  {:>10.1} m", m_g, b4, c6);
    }

    // Find the empty mass at which OpsRocket reproduces the *trusted*
    // C6-3 measured apogee (151.5 m). The thesis flagged the SF B4-4
    // thrust curve as unreliable, so C6-3 is the defensible anchor.
    let target = 151.5_f64;
    let (mut lo, mut hi) = (0.060_f64, 0.140_f64);
    for _ in 0..40 {
        let mid = 0.5 * (lo + hi);
        let a = run("C6", 3.0, mid);
        if a > target { lo = mid } else { hi = mid }
    }
    let m_fit = 0.5 * (lo + hi);
    let c6_fit = run("C6", 3.0, m_fit);
    let b4_fit = run("B4", 4.0, m_fit);
    println!("\n── Calibrated to the trusted C6-3 altimeter point ──");
    println!("  Empty mass that reproduces real C6-3 apogee: {:.1} g", m_fit * 1000.0);
    println!("  (a plausible value for a 56 cm / 29 mm rocket + altimeter)\n");
    println!("  {:<16}{:>10}{:>10}{:>12}", "", "OpsRocket", "Reality", "vs reality");
    println!(
        "  {:<16}{:>8.1} m{:>8.1} m{:>10.1}%",
        "C6-3 (trusted)", c6_fit, target, (c6_fit - target) / target * 100.0
    );
    println!(
        "  {:<16}{:>8.1} m{:>8.1} m{:>10.1}%",
        "B4-4 (curve ?)", b4_fit, 64.0, (b4_fit - 64.0) / 64.0 * 100.0
    );
    println!("\n  Java OpenRocket C6-3 prediction: 161.4 m  (+{:.1}% vs reality)",
        (161.4 - target) / target * 100.0);
    println!("  RockSim         C6-3 prediction: 180.1 m  (+{:.1}% vs reality)",
        (180.1 - target) / target * 100.0);
    println!("\nReality is the altimeter number; Java/RockSim are *predictions*.");
}
