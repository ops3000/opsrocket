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

impl ThrustCurve {
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
