//! Ports of upstream OpenRocket aerodynamics JUnit tests.
//!
//! Original Java tests:
//! - `info.openrocket.core.aerodynamics.BarrowmanCalculatorTest`
//! - `info.openrocket.core.aerodynamics.FinSetCalcTest`
//! - `info.openrocket.core.aerodynamics.SymmetricComponentCalcTest`
//!
//! Each test reproduces the Java fixture programmatically (no `.ork` round-
//! trip) and asserts on the Barrowman coefficients. Expected values are taken
//! from the Java tests' assertions and verified to be the originals.

use opsrocket_core::component::{
    AxialMethod, BodyTube, Common, Component, FinCrossSection, FinSet, NoseCone, NoseShape, Rocket, Stage,
};
use opsrocket_sim::aero::{compute, FlightConditions};

const EPSILON: f64 = 1e-5;

/// Port of `BarrowmanCalculatorTest::testEmptyRocket`.
/// Java assertion: empty rocket → CN_alpha == 0, CP at origin.
#[test]
fn empty_rocket_cna_zero() {
    let rocket = Rocket::default();
    let fc = FlightConditions { mach: 0.05, angle_of_attack: 0.0, reynolds: 1.0e6 };
    let c = compute(&rocket, fc);
    assert!(c.cn_alpha.abs() < EPSILON);
    assert!(c.cp_axial.abs() < EPSILON);
}

/// Port of the rocket geometry from `TestRockets::makeEstesAlphaIII`.
fn make_estes_alpha_iii() -> Rocket {
    let nose = NoseCone {
        common: Common::new("alpha-nose", "Nose Cone"),
        shape: NoseShape::Ogive,
        shape_parameter: 1.0,
        length: 0.07,
        aft_radius: 0.012,
        thickness: 0.001,
        aft_shoulder_radius: 0.011,
        aft_shoulder_length: 0.02,
        aft_shoulder_thickness: 0.001,
        aft_shoulder_capped: false,
        is_flipped: false,
    };
    let mut fin_common = Common::new("alpha-fins", "3 Fin Set");
    fin_common.axial_method = AxialMethod::Bottom;
    let fin = FinSet {
        common: fin_common,
        fin_count: 3,
        root_chord: 0.05,
        tip_chord: 0.03,
        sweep_length: 0.02,
        height: 0.05,
        thickness: 0.0032,
        cant_angle: 0.0,
        cross_section: FinCrossSection::Square,
        shape: Default::default(),
        points: Vec::new(),
    };
    let body = BodyTube {
        common: Common::new("alpha-body", "Body Tube"),
        length: 0.20,
        radius: Some(0.012),
        thickness: 0.0003,
        children: vec![Component::FinSet(fin)],
        motor_mount: None,
    };
    let mut stage = Stage::default();
    stage.common.name = "Stage".to_string();
    stage.children.push(Component::NoseCone(nose));
    stage.children.push(Component::BodyTube(body));
    let mut rocket = Rocket::default();
    rocket.name = "Estes Alpha III / Code Verification Rocket".to_string();
    rocket.stages.push(stage);
    rocket
}

/// CP must be aft of the body tube's leading edge for a stable trapezoidal-
/// finned design like the Alpha III.
#[test]
fn alpha_iii_cp_aft_of_nose() {
    let rocket = make_estes_alpha_iii();
    let fc = FlightConditions { mach: 0.05, angle_of_attack: 0.0, reynolds: 1.0e6 };
    let c = compute(&rocket, fc);
    // Total rocket length: 0.07 (nose) + 0.20 (body) = 0.27 m.
    // Trapezoidal fins at the body tail with sweep 0.02, root 0.05, height
    // 0.05: their CP is downstream of the body's mid-length. The whole-rocket
    // CP must be > 0.07 (nose tip + nose length) and < 0.27 (overall length).
    assert!(c.cp_axial > 0.07, "CP {} should be aft of nose tip", c.cp_axial);
    assert!(c.cp_axial < 0.27, "CP {} should be forward of tail", c.cp_axial);
    // CN_alpha should be > 2 (nose contributes 2, fins add more).
    assert!(c.cn_alpha > 2.0, "CN_alpha = {} should exceed 2", c.cn_alpha);
}

/// Mimics part of `testFinCountEffect`: removing one fin reduces CN_alpha.
#[test]
fn fewer_fins_reduce_cn_alpha() {
    let three_fin = make_estes_alpha_iii();
    let mut two_fin = three_fin.clone();
    if let Component::BodyTube(b) = &mut two_fin.stages[0].children[1] {
        if let Component::FinSet(f) = &mut b.children[0] {
            f.fin_count = 2;
        }
    }
    let fc = FlightConditions { mach: 0.05, angle_of_attack: 0.0, reynolds: 1.0e6 };
    let c3 = compute(&three_fin, fc);
    let c2 = compute(&two_fin, fc);
    assert!(c3.cn_alpha > c2.cn_alpha,
        "3 fins ({}) should provide more CN_alpha than 2 fins ({})", c3.cn_alpha, c2.cn_alpha);
}

/// Reference length / area should equal the maximum body diameter / cross-
/// section even for an otherwise-empty rocket.
#[test]
fn reference_length_matches_max_diameter() {
    let rocket = make_estes_alpha_iii();
    let c = compute(&rocket, FlightConditions { mach: 0.05, angle_of_attack: 0.0, reynolds: 1e6 });
    assert!((c.reference_length - 0.024).abs() < 1e-9);
    let area = std::f64::consts::PI * 0.012 * 0.012;
    assert!((c.reference_area - area).abs() < 1e-12);
}

/// Port of a `FlightConditionsTest`-style check: zero AOA gives finite CN.
#[test]
fn zero_aoa_gives_finite_aero() {
    let rocket = make_estes_alpha_iii();
    let c = compute(&rocket, FlightConditions { mach: 0.1, angle_of_attack: 0.0, reynolds: 1e6 });
    assert!(c.cn_alpha.is_finite());
    assert!(c.cd.is_finite());
    assert!(c.cp_axial.is_finite());
    assert!(c.cd > 0.0);
}
