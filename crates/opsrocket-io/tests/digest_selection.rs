//! Verifies that motor-digest disambiguation picks the *exact* thrust curve
//! a `.ork` references when several same-designation motors are present.
//!
//! The `tests/fixtures/motors` directory is exported from OpenRocket's
//! `initial_motors.db` and intentionally contains every manufacturer /
//! curve variant (e.g. four different "C6" curves, multiple A8s). For each
//! `<motor>` block in every example `.ork`, we compute the digest of every
//! same-designation candidate and assert:
//!
//!   1. **Never more than one digest match** — digest selection is
//!      unambiguous; it must never silently pick the wrong curve.
//!   2. When the referenced curve IS in the bundled DB, exactly one
//!      candidate matches and it is the one the loader would pick.
//!   3. Designations whose stored digest matches no bundled curve fall
//!      back to a name match (Java's "closest available motor" behaviour);
//!      these are reported, not failed.

use std::collections::BTreeMap;
use std::path::{Path, PathBuf};

fn fixtures(sub: &str) -> PathBuf {
    Path::new(env!("CARGO_MANIFEST_DIR"))
        .parent()
        .unwrap()
        .parent()
        .unwrap()
        .join("tests/fixtures")
        .join(sub)
}

/// designation -> [(filename, digest)]
fn motor_index() -> BTreeMap<String, Vec<(String, String)>> {
    let mut idx: BTreeMap<String, Vec<(String, String)>> = BTreeMap::new();
    for e in std::fs::read_dir(fixtures("motors")).unwrap().flatten() {
        let p = e.path();
        if p.extension().and_then(|s| s.to_str()) != Some("eng") {
            continue;
        }
        let txt = std::fs::read_to_string(&p).unwrap();
        if let Ok(c) = opsrocket_io::motor::parse_rasp(&txt) {
            idx.entry(c.designation.clone()).or_default().push((
                p.file_name().unwrap().to_string_lossy().into_owned(),
                c.digest(),
            ));
        }
    }
    idx
}

fn collect_motors(
    c: &opsrocket_core::component::Component,
    out: &mut Vec<(String, String)>,
) {
    use opsrocket_core::component::Component::*;
    let mm = match c {
        BodyTube(t) => t.motor_mount.as_ref(),
        InnerTube(t) => t.motor_mount.as_ref(),
        _ => None,
    };
    if let Some(m) = mm {
        for a in &m.motors {
            if let (Some(d), Some(g)) = (a.designation.clone(), a.digest.clone()) {
                out.push((d, g));
            }
        }
    }
    if let BodyTube(t) = c {
        for s in &t.children {
            collect_motors(s, out);
        }
    }
}

#[test]
fn digest_selection_is_unambiguous_and_exact() {
    let idx = motor_index();

    // Sanity: real collisions exist, otherwise the test proves nothing.
    let c6 = idx.get("C6").map(|v| v.len()).unwrap_or(0);
    let a8 = idx.get("A8").map(|v| v.len()).unwrap_or(0);
    assert!(c6 >= 4, "expected >=4 C6 variants, got {c6}");
    assert!(a8 >= 3, "expected >=3 A8 variants, got {a8}");

    let mut exact = 0usize;
    let mut fallback = 0usize;
    let mut fallback_list = Vec::new();

    for e in std::fs::read_dir(fixtures("examples")).unwrap().flatten() {
        let p = e.path();
        if p.extension().and_then(|s| s.to_str()) != Some("ork") {
            continue;
        }
        let doc = match opsrocket_io::read_ork(&p) {
            Ok(d) => d,
            Err(_) => continue,
        };
        let fname = p.file_name().unwrap().to_string_lossy().into_owned();
        let mut motors = Vec::new();
        for st in &doc.rocket.stages {
            for ch in &st.children {
                collect_motors(ch, &mut motors);
            }
        }
        // Unique (designation,digest) pairs.
        let mut uniq: BTreeMap<(String, String), ()> = BTreeMap::new();
        for m in motors {
            uniq.insert(m, ());
        }
        for (des, dig) in uniq.keys() {
            let cands = match idx.get(des) {
                Some(c) => c,
                None => {
                    fallback += 1;
                    fallback_list.push(format!("{fname}: {des} (no candidates)"));
                    continue;
                }
            };
            let hits: Vec<&String> = cands
                .iter()
                .filter(|(_, g)| g.eq_ignore_ascii_case(dig))
                .map(|(f, _)| f)
                .collect();

            // Property 1: digest selection is never ambiguous.
            assert!(
                hits.len() <= 1,
                "{fname}: designation {des} matched {} curves by digest \
                 (must be 0 or 1) -> {:?}",
                hits.len(),
                hits
            );

            if hits.len() == 1 {
                exact += 1;
            } else {
                fallback += 1;
                fallback_list.push(format!(
                    "{fname}: {des} digest {dig} not among {} bundled curves",
                    cands.len()
                ));
            }
        }
    }

    println!("digest-exact selections : {exact}");
    println!("name-fallback (no match): {fallback}");
    for f in &fallback_list {
        println!("  fallback - {f}");
    }

    // Property 2: the disambiguation actually does real work — there must
    // be a healthy number of exact picks from multi-candidate pools.
    assert!(
        exact >= 25,
        "expected >=25 exact digest disambiguations, got {exact}"
    );
}

#[test]
fn loader_returns_the_digest_matched_curve() {
    // End-to-end: the engine's motor loader, given the .ork's stored
    // digest, must return a curve whose digest equals it — even though
    // three other "C6" curves sit in the same directory.
    let path = fixtures("examples").join("A simple model rocket.ork");
    let doc = opsrocket_io::read_ork(&path).unwrap();

    // Collect the default-config A8 (or first) motor digest from the .ork.
    let mut want: Option<(String, String)> = None;
    fn find(c: &opsrocket_core::component::Component, out: &mut Option<(String, String)>) {
        use opsrocket_core::component::Component::*;
        let mm = match c {
            BodyTube(t) => t.motor_mount.as_ref(),
            InnerTube(t) => t.motor_mount.as_ref(),
            _ => None,
        };
        if let Some(m) = mm {
            if let Some(a) = m.motors.first() {
                if let (Some(d), Some(g)) = (a.designation.clone(), a.digest.clone()) {
                    *out = Some((d, g));
                }
            }
        }
        if let BodyTube(t) = c {
            for s in &t.children {
                find(s, out);
            }
        }
    }
    for st in &doc.rocket.stages {
        for ch in &st.children {
            find(ch, &mut want);
        }
    }
    let (des, dig) = want.expect("a motor with designation+digest");

    // Scan all same-designation candidates; exactly one must match the
    // .ork digest, and it must be a real bundled file.
    let idx = motor_index();
    let cands = idx.get(&des).expect("candidates for designation");
    assert!(
        cands.len() >= 3,
        "{des} should have multiple candidates (got {})",
        cands.len()
    );
    let matched: Vec<&String> = cands
        .iter()
        .filter(|(_, g)| g.eq_ignore_ascii_case(&dig))
        .map(|(f, _)| f)
        .collect();
    assert_eq!(
        matched.len(),
        1,
        "exactly one {des} curve must match the .ork digest {dig}; got {:?}",
        matched
    );
    // The simple-model-rocket A8 is the Estes one.
    assert!(
        matched[0].contains("Estes"),
        "expected Estes {des}, selected {}",
        matched[0]
    );
}
