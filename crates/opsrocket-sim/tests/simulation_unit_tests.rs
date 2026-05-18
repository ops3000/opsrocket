//! Ports of upstream OpenRocket simulation JUnit tests.
//!
//! Original Java tests:
//! - `info.openrocket.core.simulation.FlightEventsTest`
//! - `info.openrocket.core.simulation.RK6AccumulationBugTest`
//! - `info.openrocket.core.simulation.FlightDataTest`
//! - `info.openrocket.core.simulation.SimulationOptionsGravityTest`
//!
//! Where the Java test depended on Guice DI or other JVM-only machinery, the
//! Rust port asserts on the equivalent public behaviour.

use opsrocket_sim::events::{Event, EventKind, EventQueue};
use opsrocket_sim::flight::{rk4_step, ForceSampler, State};
use opsrocket_core::atmosphere::ExtendedIsa;
use opsrocket_core::geom::Vec3;
use opsrocket_core::units::G0;

/// Port of `FlightEventsTest::testEventOrdering` style check: events fire in
/// time order regardless of insertion order.
#[test]
fn event_queue_returns_earliest_first() {
    let mut q = EventQueue::default();
    q.push(Event { time: 5.0, kind: EventKind::Apogee });
    q.push(Event { time: 2.0, kind: EventKind::Burnout });
    q.push(Event { time: 10.0, kind: EventKind::GroundHit });
    q.push(Event { time: 0.5, kind: EventKind::Ignition });

    assert_eq!(q.pop_due(10.0).unwrap().kind, EventKind::Ignition);
    assert_eq!(q.pop_due(10.0).unwrap().kind, EventKind::Burnout);
    assert_eq!(q.pop_due(10.0).unwrap().kind, EventKind::Apogee);
    assert_eq!(q.pop_due(10.0).unwrap().kind, EventKind::GroundHit);
}

/// Port of `RK6AccumulationBugTest`: RK integration of a constant-force fall
/// must recover the analytic answer h = 0.5·g·t² to machine precision over
/// many steps.
///
/// We perform 100 RK4 steps of dt=0.01 of a 1 kg body in free-fall (no drag,
/// no thrust) and check the final position.
#[test]
fn rk4_freefall_matches_analytic() {
    let atmosphere = ExtendedIsa::default();
    let thrust = |_t: f64| -> f64 { 0.0 };
    let mass_dot = |_t: f64| -> f64 { 0.0 };
    let sampler = ForceSampler {
        atmosphere: &atmosphere,
        wind: Vec3::zeros(),
        thrust: &thrust,
        cd: 0.0,
        area_ref: 0.0,
        mass_dot: &mass_dot,
        cn_alpha: 0.0,
        reference_length: 0.025,
        cp_axial: 0.0,
        cg_axial: 0.0,
        moment_of_inertia_rot: 1.0,
        moment_of_inertia_long: 1.0,
        body_lift_planform_term: 0.0,
        body_lift_cp: 0.0,
        pitch_damping_mul: 0.0,
        gravity_model: opsrocket_core::gravity::GravityModel::Constant(G0),
        geodetic: opsrocket_core::gravity::GeodeticComputation::Flat,
        launch_site: opsrocket_core::gravity::WorldCoordinate::from_degrees(0.0, 0.0, 0.0),
        launch_altitude: 0.0,
        roll_forcing: 0.0,
        roll_damp_coeff: 0.0,
        pyr_seed: 0,
        recovery: false,
    };
    let mut s = State::at_rest(100.0, 1.0, 0.0);
    let dt = 0.01;
    for _ in 0..100 {
        s = rk4_step(&s, dt, &sampler);
    }
    let t = s.t;
    let h_predicted = 100.0 - 0.5 * G0 * t * t;
    let v_predicted = -G0 * t;
    assert!((s.pos.z - h_predicted).abs() < 1e-6, "pos error: {} vs {}", s.pos.z, h_predicted);
    assert!((s.vel.z - v_predicted).abs() < 1e-6, "vel error: {} vs {}", s.vel.z, v_predicted);
}

/// Mass derivative is integrated by RK4 just like position. A constant
/// `mass_dot = -0.01` over 1 s should produce a mass change of -0.01 kg.
#[test]
fn rk4_integrates_mass_loss_linearly() {
    let atmosphere = ExtendedIsa::default();
    let thrust = |_t: f64| -> f64 { 0.0 };
    let mass_dot = |_t: f64| -> f64 { -0.01 };
    let sampler = ForceSampler {
        atmosphere: &atmosphere,
        wind: Vec3::zeros(),
        thrust: &thrust,
        cd: 0.0,
        area_ref: 0.0,
        mass_dot: &mass_dot,
        cn_alpha: 0.0,
        reference_length: 0.025,
        cp_axial: 0.0,
        cg_axial: 0.0,
        moment_of_inertia_rot: 1.0,
        moment_of_inertia_long: 1.0,
        body_lift_planform_term: 0.0,
        body_lift_cp: 0.0,
        pitch_damping_mul: 0.0,
        gravity_model: opsrocket_core::gravity::GravityModel::Constant(G0),
        geodetic: opsrocket_core::gravity::GeodeticComputation::Flat,
        launch_site: opsrocket_core::gravity::WorldCoordinate::from_degrees(0.0, 0.0, 0.0),
        launch_altitude: 0.0,
        roll_forcing: 0.0,
        roll_damp_coeff: 0.0,
        pyr_seed: 0,
        recovery: false,
    };
    let mut s = State::at_rest(1000.0, 1.0, 0.0);
    for _ in 0..100 {
        s = rk4_step(&s, 0.01, &sampler);
    }
    assert!((s.mass - 0.99).abs() < 1e-9, "mass after 1s: {}", s.mass);
}

/// Port of `SimulationOptionsGravityTest`: `G0` is the standard gravity
/// constant 9.80665 m/s².
#[test]
fn standard_gravity_is_exact() {
    assert_eq!(G0, 9.806_65);
}
