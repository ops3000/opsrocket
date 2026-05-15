// Exercises the exact code the GUI's load_ork / simulate commands run,
// headlessly, so the software can be verified without a desktop window.
fn main() {
    let ork = "../../tests/fixtures/examples/A simple model rocket.ork";
    let motors = "../../tests/fixtures/motors";
    let doc = opsrocket_io::read_ork(ork).expect("read .ork");
    println!("== load_ork ==");
    println!("rocket: {}  designer: {:?}", doc.rocket.name, doc.rocket.designer);
    let layout = opsrocket_sim::mass::iter_layout(&doc.rocket);
    println!("components ({}):", layout.len());
    for (c, ax) in &layout {
        let k = format!("{:?}", c);
        let end = k.find('(').unwrap_or(k.len());
        println!("  @{:.3}m  {:<14} {}", ax, &k[..end], c.common().name);
    }
    println!(
        "simulations: {:?}",
        doc.simulations.iter().map(|s| s.name.clone()).collect::<Vec<_>>()
    );

    let name = doc.simulations[0].name.clone();
    let r = opsrocket_sim::engine::simulate_with(
        &doc,
        &name,
        Some(std::path::Path::new(motors)),
    )
    .expect("sim");
    println!("\n== simulate ({}) ==", name);
    println!(
        "rows={}  apogee={:.2} m  t_apogee={:.2} s  flight={:.2} s  gh_vel={:.2} m/s",
        r.rows.len(),
        r.max_altitude,
        r.time_to_apogee,
        r.flight_time,
        r.ground_hit_velocity
    );
    println!("events: {:?}", r.events);
    println!("sample rows (t, alt, vtot, thrust):");
    let step = (r.rows.len() / 6).max(1);
    for row in r.rows.iter().step_by(step).take(7) {
        println!(
            "  {:6.3}  {:7.3}  {:6.3}  {:6.3}",
            row[0], row[1], row[4], row[29]
        );
    }
}
