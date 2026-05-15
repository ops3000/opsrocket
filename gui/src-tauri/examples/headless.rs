// Exercises the exact code the GUI's load_ork / simulate commands run,
// headlessly, so the backend can be verified without a desktop window.
fn main() {
    let ork = "../../tests/fixtures/examples/A simple model rocket.ork";
    let motors = std::path::Path::new("../../tests/fixtures/motors");
    let doc = opsrocket_io::read_ork(ork).expect("read .ork");

    let view = opsrocket_view::build_rocket_view(&doc);
    println!("== load_ork ==");
    println!("rocket: {}  designer: {:?}", view.name, view.designer);
    println!("total_length: {:.3} m  components: {}", view.total_length, view.components.len());
    for c in &view.components {
        println!("  @{:.3}m  {:<14} {}", c.axial_start, c.kind, c.name);
    }
    println!("outline shapes: {}  lathe: {}  fins: {}", view.outline.len(), view.lathe.len(), view.fins.len());
    println!("simulations: {:?}", view.simulations);

    let fd = opsrocket_view::run_flight(&doc, None, Some(motors)).expect("sim");
    println!("\n== simulate ({}) ==", view.simulations.first().cloned().unwrap_or_default());
    println!(
        "rows={}  apogee={:.2} m  t_apogee={:.2} s  flight={:.2} s  gh_vel={:.2} m/s",
        fd.time.len(),
        fd.apogee,
        fd.time_to_apogee,
        fd.flight_time,
        fd.ground_hit_velocity
    );
    println!("events: {:?}", fd.events);
}
