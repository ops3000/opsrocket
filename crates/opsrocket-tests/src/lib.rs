//! Regression test harness.
//!
//! The integration tests in `tests/` use these helpers to:
//!   1. Parse a `.ork` fixture.
//!   2. Run the Rust simulator on the default simulation.
//!   3. Compare the resulting flight data against the cached `<datapoint>`
//!      reference embedded by the upstream Java tool.

use std::path::{Path, PathBuf};

pub fn fixtures_dir() -> PathBuf {
    Path::new(env!("CARGO_MANIFEST_DIR"))
        .parent()
        .and_then(|p| p.parent())
        .map(|p| p.join("tests/fixtures"))
        .expect("workspace fixtures dir")
}

pub fn motors_dir() -> PathBuf {
    fixtures_dir().join("motors")
}

pub fn examples_dir() -> PathBuf {
    fixtures_dir().join("examples")
}

/// Per-column tolerance.  Different columns have different scales so a single
/// global tolerance would be either too lax or too strict.  Use these when
/// diffing a Rust output against a Java reference.
#[derive(Debug, Clone, Copy)]
pub struct ColumnTolerance {
    pub abs: f64,
    pub rel: f64,
}

impl ColumnTolerance {
    pub const fn new(abs: f64, rel: f64) -> Self {
        Self { abs, rel }
    }

    pub fn matches(&self, expected: f64, actual: f64) -> bool {
        if expected.is_nan() || actual.is_nan() {
            return expected.is_nan() == actual.is_nan();
        }
        let delta = (expected - actual).abs();
        if delta <= self.abs {
            return true;
        }
        let denom = expected.abs().max(actual.abs()).max(f64::MIN_POSITIVE);
        delta / denom <= self.rel
    }
}

/// Default tolerances for OpenRocket reference dumps.
pub fn default_tolerance(column_name: &str) -> ColumnTolerance {
    match column_name {
        "Time" => ColumnTolerance::new(1e-3, 1e-4),
        "Altitude" | "Altitude above sea level" => ColumnTolerance::new(0.5, 5e-2),
        "Vertical velocity" | "Total velocity" | "Lateral velocity" => ColumnTolerance::new(0.5, 5e-2),
        "Position East of launch" | "Position North of launch" | "Lateral distance" => {
            ColumnTolerance::new(0.5, 5e-2)
        }
        "Mass" | "Motor mass" => ColumnTolerance::new(1e-3, 1e-2),
        "Thrust" => ColumnTolerance::new(0.5, 5e-2),
        // Drag and CN_alpha tend to diverge first as Mach-corrections differ
        "Drag coefficient" | "Friction drag coefficient" | "Pressure drag coefficient"
        | "Base drag coefficient" | "Axial drag coefficient" | "Normal force coefficient" => {
            ColumnTolerance::new(0.1, 0.25)
        }
        "Air temperature" | "Air pressure" | "Air density" | "Speed of sound" => {
            ColumnTolerance::new(1.0, 5e-3)
        }
        _ => ColumnTolerance::new(1.0, 0.5),
    }
}

/// Build a per-column tolerance map for `column_names`.
pub fn tolerance_map(column_names: &[String]) -> Vec<ColumnTolerance> {
    column_names.iter().map(|n| default_tolerance(n)).collect()
}

/// Compare two flight-data traces. Returns the first divergence (column, row,
/// expected, actual) if any column fails its tolerance, otherwise None.
pub fn first_divergence(
    column_names: &[String],
    expected: &[Vec<f64>],
    actual: &[Vec<f64>],
    tol: &[ColumnTolerance],
) -> Option<Divergence> {
    let rows = expected.len().min(actual.len());
    let cols = column_names.len();
    for row in 0..rows {
        for col in 0..cols.min(expected[row].len()).min(actual[row].len()) {
            let e = expected[row][col];
            let a = actual[row][col];
            if !tol[col].matches(e, a) {
                return Some(Divergence {
                    column: column_names[col].clone(),
                    row,
                    expected: e,
                    actual: a,
                });
            }
        }
    }
    None
}

#[derive(Debug, Clone)]
pub struct Divergence {
    pub column: String,
    pub row: usize,
    pub expected: f64,
    pub actual: f64,
}

/// Compute a row-by-row summary aggregating max absolute error per column.
pub fn column_max_errors(
    column_names: &[String],
    expected: &[Vec<f64>],
    actual: &[Vec<f64>],
) -> Vec<(String, f64)> {
    let cols = column_names.len();
    let mut max_err = vec![0.0_f64; cols];
    let rows = expected.len().min(actual.len());
    for row in 0..rows {
        for col in 0..cols.min(expected[row].len()).min(actual[row].len()) {
            let e = expected[row][col];
            let a = actual[row][col];
            if e.is_nan() || a.is_nan() {
                continue;
            }
            let delta = (e - a).abs();
            if delta > max_err[col] {
                max_err[col] = delta;
            }
        }
    }
    column_names.iter().cloned().zip(max_err).collect()
}

/// Resample an actual trace onto the time grid of an expected trace by
/// linearly interpolating each column. Assumes column 0 is "Time" and both
/// traces are monotonically non-decreasing in time.
pub fn resample_onto(
    expected: &[Vec<f64>],
    actual: &[Vec<f64>],
) -> Vec<Vec<f64>> {
    if actual.is_empty() {
        return Vec::new();
    }
    let cols = actual[0].len();
    let mut out = Vec::with_capacity(expected.len());
    for row in expected {
        let t = row[0];
        out.push(sample_at(actual, t, cols));
    }
    out
}

fn sample_at(actual: &[Vec<f64>], t: f64, cols: usize) -> Vec<f64> {
    if t <= actual.first().unwrap()[0] {
        return actual.first().cloned().unwrap();
    }
    if t >= actual.last().unwrap()[0] {
        return actual.last().cloned().unwrap();
    }
    for w in actual.windows(2) {
        let t0 = w[0][0];
        let t1 = w[1][0];
        if t >= t0 && t <= t1 {
            let f = if t1 - t0 > 0.0 { (t - t0) / (t1 - t0) } else { 0.0 };
            let mut out = Vec::with_capacity(cols);
            for col in 0..cols {
                let a = w[0][col];
                let b = w[1][col];
                if a.is_nan() || b.is_nan() {
                    out.push(f64::NAN);
                } else {
                    out.push(a + f * (b - a));
                }
            }
            return out;
        }
    }
    actual.last().cloned().unwrap()
}
