use opsrocket_core::component::Component;

// Per-component mass dump for physics-parity diagnostics. Mirrors the
// OpenRocket ground truth (OrMassRef): same component identity + masses,
// computed on the auto-resolved rocket exactly as empty_mass_properties.
// Usage: cargo run -p opsrocket-cli --example mass_debug -- "<file.ork>"
fn main() {
    let path = std::env::args()
        .nth(1)
        .unwrap_or_else(|| "tests/fixtures/examples/A simple model rocket.ork".into());
    let doc = opsrocket_io::read_ork(&path).unwrap();
    let resolved = opsrocket_sim::mass::resolve_auto_dimensions(&doc.rocket);
    let props = opsrocket_sim::mass::empty_mass_properties(&doc.rocket);

    let aero = opsrocket_sim::aero::compute_with(
        &resolved,
        opsrocket_sim::aero::FlightConditions {
            mach: 0.3,
            angle_of_attack: 0.0,
            reynolds: 1.0e6,
        },
        false,
    );
    let cg = props.cg_axial;
    let cp = aero.cp_axial;
    let d = aero.reference_length.max(1e-6);
    let total_len = resolved.total_length();

    println!("FILE={path}");
    println!(
        "MASS_NO_MOTORS_G={:.4}  CG_CM={:.4}  CP_CM={:.4}  D_CM={:.4}  LEN_CM={:.4}  CAL={:.4}  PCT={:.4}",
        props.mass * 1000.0,
        cg * 100.0,
        cp * 100.0,
        d * 100.0,
        total_len * 100.0,
        (cp - cg) / d,
        if total_len > 0.0 { (cp - cg) / total_len * 100.0 } else { 0.0 }
    );
    let mut sum = 0.0_f64;
    for (c, axial) in opsrocket_sim::mass::iter_layout(&resolved) {
        let m = opsrocket_sim::mass::single_component_mass(c);
        sum += m;
        let label = match c {
            Component::NoseCone(_) => "NoseCone",
            Component::BodyTube(_) => "BodyTube",
            Component::Transition(_) => "Transition",
            Component::InnerTube(_) => "InnerTube",
            Component::FinSet(_) => "FinSet",
            Component::MassObject(_) => "MassObject",
            Component::Parachute(_) => "Parachute",
            Component::ShockCord(_) => "ShockCord",
            Component::LaunchLug(_) => "LaunchLug",
            Component::CenteringRing(_) => "CenteringRing",
            Component::PodSet(_) => "PodSet",
            Component::TubeFinSet(_) => "TubeFinSet",
        };
        let common = c.common();
        let mat_str = common
            .material
            .as_ref()
            .map(|m| format!("{}@{:.2}({:?})", m.name, m.density, m.kind))
            .unwrap_or_else(|| "(none)".to_string());
        println!(
            "COMP|{:<13}|{:<24}|ax={:.4}|m={:>8.4}|mat={}",
            label,
            common.name,
            axial,
            m * 1000.0,
            mat_str
        );
    }
    println!(
        "SUM_SINGLES_G={:.4}  AGG_G={:.4}",
        sum * 1000.0,
        props.mass * 1000.0
    );
    for (name, cna, cpx) in opsrocket_sim::aero::cp_breakdown(
        &resolved,
        opsrocket_sim::aero::FlightConditions {
            mach: 0.3,
            angle_of_attack: 0.0,
            reynolds: 1.0e6,
        },
    ) {
        println!("CPA|{name}|cna={cna:.5}|cpx={:.4}", cpx * 100.0);
    }
}
