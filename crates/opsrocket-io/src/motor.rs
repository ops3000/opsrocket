//! Motor / thrust-curve loader.
//!
//! Currently supports the RASP `.eng` text format (the de-facto standard for
//! hobby motors). RockSim `.rse` (XML) support is pending.
//!
//! A `.eng` file looks like:
//! ```text
//! ;CSV-like comments
//! ; Estes A8 motor
//! A8 18 70 3-5-7 0.00295 0.0162 Estes
//!   0.01 1.2
//!   0.05 12.0
//!   …
//!   0.7  0.0
//! ```
//! The header line is whitespace-delimited:
//! `designation diameter_mm length_mm delays prop_mass_kg total_mass_kg manufacturer`
//! followed by `time thrust` pairs terminated by a `0 0` row (or end-of-record).

use thiserror::Error;

#[derive(Debug, Clone)]
pub struct ThrustCurve {
    pub designation: String,
    pub manufacturer: String,
    pub diameter_m: f64,
    pub length_m: f64,
    pub propellant_mass: f64,
    pub total_mass: f64,
    pub delays: Vec<f64>,
    pub points: Vec<ThrustPoint>,
}

#[derive(Debug, Clone, Copy)]
pub struct ThrustPoint {
    pub time: f64,
    pub thrust: f64,
}

/// Quantise a value exactly as Java `MotorDigest.update`:
///   v = v + signum(v)·EPSILON;  v *= multiplier;  v = v + signum(v)·EPSILON;
///   intval = Math.round(v)            (round half up toward +∞)
fn digest_quantize(v: f64, multiplier: i64) -> i32 {
    const EPS: f64 = 0.00000000001; // 1e-11, MotorDigest.EPSILON
    let next = |x: f64| x + x.signum() * EPS;
    let mut x = next(v);
    x *= multiplier as f64;
    x = next(x);
    // Java Math.round(double) = floor(x + 0.5)
    (x + 0.5).floor() as i32
}

/// Compute the OpenRocket motor digest for a RASP-loaded motor — a direct
/// port of `RASPMotorLoader.createRASPMotor` + `MotorDigest`.
///
/// The digest is MD5 over a byte stream of big-endian 32-bit ints:
///   for each DataType block (in ascending `order`):
///     [order:i32][len:i32][quantised values...:i32]
/// RASP motors digest exactly three blocks:
///   TIME_ARRAY   (order 0, ×1000)   — finalised time points (s→ms)
///   MASS_SPECIFIC(order 1, ×10000)  — [totalW, totalW−propW] (kg→0.1g)
///   FORCE_PER_TIME(order 5, ×1000)  — finalised thrust points (N→mN)
/// `total_w`/`prop_w` are in kg.
pub fn rasp_digest(
    raw_time: &[f64],
    raw_thrust: &[f64],
    total_w: f64,
    prop_w: f64,
) -> String {
    use md5::{Digest, Md5};

    // ---- sortLists: stable bubble sort by time (data is normally sorted) ----
    let mut t: Vec<f64> = raw_time.to_vec();
    let mut f: Vec<f64> = raw_thrust.to_vec();
    loop {
        let mut swapped = false;
        let mut i = 0;
        while i + 1 < t.len() {
            if t[i + 1] < t[i] {
                t.swap(i, i + 1);
                f.swap(i, i + 1);
                swapped = true;
                break;
            }
            i += 1;
        }
        if !swapped {
            break;
        }
    }

    // ---- finalizeThrustCurve ----
    let eq = |a: f64, b: f64| (a - b).abs() < 1.0e-8; // MathUtil.EPSILON
    if !t.is_empty() {
        if !eq(t[0], 0.0) {
            t.insert(0, 0.0);
            f.insert(0, 0.0);
        }
        if t.len() >= 2 && eq(t[0], 0.0) && eq(t[1], 0.0) {
            t.remove(0);
            f.remove(0);
        }
        // remove consecutive duplicate (time,thrust) points
        let mut i = 0;
        while i + 1 < t.len() {
            while i + 1 < t.len() && eq(t[i], t[i + 1]) && eq(f[i], f[i + 1]) {
                t.remove(i);
                f.remove(i);
            }
            i += 1;
        }
        // two final data points at the same time: drop the zero-thrust one
        let n = t.len() - 1;
        if n >= 1 && eq(t[n - 1], t[n]) {
            if eq(f[n - 1], 0.0) {
                t.remove(n - 1);
                f.remove(n - 1);
            } else if eq(f[n], 0.0) {
                t.remove(n);
                f.remove(n);
            }
        }
    }

    let mut h = Md5::new();
    let put_block = |hasher: &mut Md5, order: i32, mult: i64, vals: &[f64]| {
        hasher.update(order.to_be_bytes());
        hasher.update((vals.len() as i32).to_be_bytes());
        for &v in vals {
            hasher.update(digest_quantize(v, mult).to_be_bytes());
        }
    };
    put_block(&mut h, 0, 1000, &t); // TIME_ARRAY
    put_block(&mut h, 1, 10000, &[total_w, total_w - prop_w]); // MASS_SPECIFIC
    put_block(&mut h, 5, 1000, &f); // FORCE_PER_TIME
    let out = h.finalize();
    let mut s = String::with_capacity(32);
    for b in out {
        s.push_str(&format!("{:02x}", b));
    }
    s
}

impl ThrustCurve {
    /// OpenRocket-compatible motor digest (matches the `<digest>` stored in
    /// `.ork` files for RASP-sourced motors).
    pub fn digest(&self) -> String {
        let times: Vec<f64> = self.points.iter().map(|p| p.time).collect();
        let thrusts: Vec<f64> = self.points.iter().map(|p| p.thrust).collect();
        rasp_digest(&times, &thrusts, self.total_mass, self.propellant_mass)
    }

    pub fn burn_time(&self) -> f64 {
        self.points.last().map(|p| p.time).unwrap_or(0.0)
    }

    /// Total impulse (N·s) via trapezoidal integration of the thrust curve.
    pub fn total_impulse(&self) -> f64 {
        self.points
            .windows(2)
            .map(|w| 0.5 * (w[0].thrust + w[1].thrust) * (w[1].time - w[0].time))
            .sum()
    }

    /// Thrust at time `t` (0 outside the curve).
    pub fn thrust_at(&self, t: f64) -> f64 {
        if self.points.is_empty() || t <= self.points[0].time {
            return 0.0;
        }
        if t >= self.points.last().unwrap().time {
            return 0.0;
        }
        for w in self.points.windows(2) {
            if t >= w[0].time && t <= w[1].time {
                let span = w[1].time - w[0].time;
                if span <= 0.0 {
                    return w[0].thrust;
                }
                let f = (t - w[0].time) / span;
                return w[0].thrust + f * (w[1].thrust - w[0].thrust);
            }
        }
        0.0
    }

    /// Propellant mass remaining at time `t` (kg), assuming mass loss
    /// proportional to delivered impulse.
    pub fn propellant_mass_at(&self, t: f64) -> f64 {
        let total = self.total_impulse();
        if total <= 0.0 || self.propellant_mass <= 0.0 {
            return self.propellant_mass;
        }
        // Integrate from start to t.
        let mut delivered = 0.0;
        for w in self.points.windows(2) {
            if t <= w[0].time {
                break;
            }
            let upper = t.min(w[1].time);
            // thrust at upper
            let f0 = w[0].thrust;
            let f1 = if upper >= w[1].time {
                w[1].thrust
            } else {
                let frac = (upper - w[0].time) / (w[1].time - w[0].time);
                f0 + frac * (w[1].thrust - f0)
            };
            delivered += 0.5 * (f0 + f1) * (upper - w[0].time);
        }
        let used = (delivered / total) * self.propellant_mass;
        (self.propellant_mass - used).max(0.0)
    }
}

#[derive(Debug, Error)]
pub enum Error {
    #[error("malformed .eng file: {0}")]
    Malformed(String),
}

/// Parse a single-motor RASP `.eng` file.
pub fn parse_rasp(text: &str) -> Result<ThrustCurve, Error> {
    let mut lines = text
        .lines()
        .map(str::trim)
        .filter(|l| !l.is_empty() && !l.starts_with(';'));

    let header = lines.next().ok_or_else(|| Error::Malformed("missing header".into()))?;
    let parts: Vec<&str> = header.split_whitespace().collect();
    if parts.len() < 7 {
        return Err(Error::Malformed(format!("header has {} fields, want >=7", parts.len())));
    }
    let designation = parts[0].to_string();
    let diameter_m = parts[1].parse::<f64>().map_err(|_| Error::Malformed("diameter".into()))? / 1000.0;
    let length_m = parts[2].parse::<f64>().map_err(|_| Error::Malformed("length".into()))? / 1000.0;
    let delays = parts[3]
        .split('-')
        .filter_map(|s| s.parse::<f64>().ok())
        .collect();
    let propellant_mass = parts[4].parse().map_err(|_| Error::Malformed("propellant mass".into()))?;
    let total_mass = parts[5].parse().map_err(|_| Error::Malformed("total mass".into()))?;
    let manufacturer = parts[6..].join(" ");

    let mut points = Vec::new();
    for line in lines {
        let mut it = line.split_whitespace();
        let t: f64 = match it.next().and_then(|s| s.parse().ok()) {
            Some(v) => v,
            None => continue,
        };
        let f: f64 = it.next().and_then(|s| s.parse().ok()).unwrap_or(0.0);
        if !points.is_empty() && t == 0.0 && f == 0.0 {
            break;
        }
        points.push(ThrustPoint { time: t, thrust: f });
        if t > 0.0 && f == 0.0 && points.len() > 1 {
            break;
        }
    }
    if points.is_empty() {
        return Err(Error::Malformed("no thrust points".into()));
    }
    if points[0].time > 0.0 {
        // RASP files conventionally have an implicit (0, 0) start.
        points.insert(0, ThrustPoint { time: 0.0, thrust: 0.0 });
    }
    Ok(ThrustCurve {
        designation,
        manufacturer,
        diameter_m,
        length_m,
        propellant_mass,
        total_mass,
        delays,
        points,
    })
}

#[cfg(test)]
mod tests {
    use super::*;
    use approx::assert_relative_eq;

    /// Exactly one bundled Estes A8 curve must digest to the value stored
    /// in upstream `A simple model rocket.ork`
    /// (`<digest>22aec01287ea1e3b8c6f66b26fe5fea6</digest>`).  Estes ships
    /// multiple A8 thrust-curve variants; this proves both that our RASP
    /// MotorDigest port is bit-for-bit identical to Java OpenRocket *and*
    /// that the digest uniquely selects the right variant.
    #[test]
    fn a8_digest_matches_openrocket_ork() {
        const WANT: &str = "22aec01287ea1e3b8c6f66b26fe5fea6";
        let dir = std::path::Path::new(env!("CARGO_MANIFEST_DIR"))
            .parent()
            .unwrap()
            .parent()
            .unwrap()
            .join("tests/fixtures/motors");
        let mut matches = Vec::new();
        for e in std::fs::read_dir(&dir).expect("motors dir").flatten() {
            let p = e.path();
            if p.extension().and_then(|s| s.to_str()) != Some("eng") {
                continue;
            }
            let fname = p.file_name().unwrap().to_string_lossy().into_owned();
            if !fname.contains("_A8") {
                continue;
            }
            let txt = std::fs::read_to_string(&p).unwrap();
            if let Ok(c) = parse_rasp(&txt) {
                if c.digest() == WANT {
                    matches.push(fname);
                }
            }
        }
        assert_eq!(
            matches.len(),
            1,
            "exactly one A8 curve must digest to {WANT}; got {matches:?}"
        );
        assert!(
            matches[0].contains("Estes"),
            "the matching A8 must be the Estes one, got {}",
            matches[0]
        );
    }

    // Real Estes A8-3 thrust curve (truncated).
    const A8_ENG: &str = "\
;Estes A8 sample
A8 18 70 3-5-7 0.00295 0.0162 Estes
   0.041 9.000
   0.084 13.000
   0.127 9.500
   0.166 5.500
   0.347 1.500
   0.504 0.000
";

    #[test]
    fn parse_a8() {
        let c = parse_rasp(A8_ENG).unwrap();
        assert_eq!(c.designation, "A8");
        assert_eq!(c.manufacturer, "Estes");
        assert_relative_eq!(c.diameter_m, 0.018);
        assert_relative_eq!(c.length_m, 0.070);
        assert_relative_eq!(c.propellant_mass, 0.00295);
        assert!(c.burn_time() > 0.5);
        // Total impulse for A8 ≈ 2.5 N·s (rough)
        let ti = c.total_impulse();
        assert!(ti > 1.5 && ti < 3.0, "total impulse out of range: {}", ti);
    }
}
