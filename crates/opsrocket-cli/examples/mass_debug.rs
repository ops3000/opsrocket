use opsrocket_core::component::Component;

fn main() {
    let path = "tests/fixtures/examples/A simple model rocket.ork";
    let doc = opsrocket_io::read_ork(path).unwrap();
    let props = opsrocket_sim::mass::empty_mass_properties(&doc.rocket);
    println!("Empty mass total: {:.6} kg ({:.2} g)\n", props.mass, props.mass * 1000.0);
    let mut sum = 0.0_f64;
    for (c, axial) in opsrocket_sim::mass::iter_layout(&doc.rocket) {
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
        };
        let common = c.common();
        let mat_str = common
            .material
            .as_ref()
            .map(|m| format!("{}@{:.4} ({:?})", m.name, m.density, m.kind))
            .unwrap_or_else(|| "(none)".to_string());
        println!(
            "  axial={:.4}  m={:>7.3} g  {:<13} name={:<25}  mat={}",
            axial,
            m * 1000.0,
            label,
            common.name,
            mat_str
        );
    }
    println!("\nSum of singles: {:.4} g (vs aggregator {:.4} g)", sum * 1000.0, props.mass * 1000.0);
}
