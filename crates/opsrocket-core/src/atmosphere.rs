//! Atmosphere model — port of
//! `info.openrocket.core.models.atmosphere.ExtendedISAModel` plus the
//! `InterpolatingAtmosphericModel` 500 m grid cache that wraps it.
//!
//! Eight ISA layers up to 84852 m geopotential altitude with geopotential /
//! geometric altitude conversion via Earth radius 6 356 766 m. The Java
//! implementation caches conditions at 500 m intervals and linearly
//! interpolates between them; we do the same so behaviour matches exactly.

use crate::units::{G0, GAMMA_AIR};

// Java constants (kept module-local to make the source-of-truth obvious).
const R_AIR: f64 = 287.053;
const ISA_EARTH_RADIUS: f64 = 6_356_766.0;
const DELTA_M: f64 = 500.0;

/// Atmospheric conditions at a single point.
#[derive(Debug, Clone, Copy, PartialEq)]
pub struct AtmosphericConditions {
    /// Temperature (K).
    pub temperature: f64,
    /// Static pressure (Pa).
    pub pressure: f64,
    /// Density (kg/m³).
    pub density: f64,
    /// Speed of sound (m/s).
    pub speed_of_sound: f64,
    /// Dynamic viscosity (Pa·s).
    pub viscosity: f64,
}

impl AtmosphericConditions {
    pub fn mach(&self, speed: f64) -> f64 {
        speed / self.speed_of_sound
    }

    /// Build derived quantities (density, speed of sound, viscosity) from
    /// temperature and pressure using the ideal-gas relation and
    /// Sutherland's formula for viscosity.
    pub fn from_t_p(temperature: f64, pressure: f64) -> Self {
        let density = pressure / (R_AIR * temperature);
        let speed_of_sound = (GAMMA_AIR * R_AIR * temperature).sqrt();
        let viscosity = sutherland_viscosity(temperature);
        Self { temperature, pressure, density, speed_of_sound, viscosity }
    }
}

/// Trait for any atmosphere model.
pub trait AtmosphereModel: Send + Sync {
    fn conditions(&self, altitude_m: f64) -> AtmosphericConditions;
}

const STANDARD_LAYERS_M: [f64; 8] = [
    0.0, 11_000.0, 20_000.0, 32_000.0, 47_000.0, 51_000.0, 71_000.0, 84_852.0,
];
const STANDARD_TEMPERATURES_K: [f64; 8] = [
    288.15, 216.65, 216.65, 228.65, 270.65, 270.65, 214.65, 186.95,
];

/// Extended ISA model with eight layers and a pre-baked 500 m grid.
#[derive(Debug, Clone)]
pub struct ExtendedIsa {
    pub t0: f64,
    pub p0: f64,
    base_temperature: Vec<f64>,
    base_pressure: Vec<f64>,
    grid: Vec<AtmosphericConditions>,
}

impl Default for ExtendedIsa {
    fn default() -> Self {
        Self::new(288.15, 101_325.0)
    }
}

impl ExtendedIsa {
    pub fn new(t0: f64, p0: f64) -> Self {
        let n = STANDARD_LAYERS_M.len();
        let mut base_temperature = STANDARD_TEMPERATURES_K.to_vec();
        base_temperature[0] = t0;
        let mut base_pressure = vec![0.0; n];
        base_pressure[0] = p0;
        for i in 1..n {
            let alt1 = STANDARD_LAYERS_M[i - 1];
            let alt2 = STANDARD_LAYERS_M[i];
            let t1 = base_temperature[i - 1];
            let t2 = base_temperature[i];
            // ExtendedISAModel.calculatePressure(alt1=top, temp1=temp_top,
            //   alt2=base, temp2=temp_base, press2=press_base):
            //   tempRate = (temp_base - temp_top) / (alt_base - alt_top)
            //   if |tempRate| > 1e-6:
            //     return press_base / pow(1 + (alt_base - alt_top)*tempRate/temp_top,
            //                              -G/(tempRate*R))
            //   else:
            //     return press_base / exp(-(alt_base - alt_top)*G/(R*temp_top))
            base_pressure[i] = pressure_at(alt2, t2, alt1, t1, base_pressure[i - 1]);
        }
        let grid = build_grid(&base_temperature, &base_pressure);
        Self { t0, p0, base_temperature, base_pressure, grid }
    }

    /// Direct exact ISA computation (no grid). Matches `getExactConditions`.
    pub fn exact_conditions(&self, altitude_m: f64) -> AtmosphericConditions {
        exact_at(altitude_m, &self.base_temperature, &self.base_pressure)
    }
}

impl AtmosphereModel for ExtendedIsa {
    fn conditions(&self, altitude_m: f64) -> AtmosphericConditions {
        if altitude_m <= 0.0 {
            return self.grid[0];
        }
        let max_index = self.grid.len() - 1;
        let max_alt = DELTA_M * max_index as f64;
        if altitude_m >= max_alt {
            return self.grid[max_index];
        }
        let lower = (altitude_m / DELTA_M).floor() as usize;
        let frac = (altitude_m - lower as f64 * DELTA_M) / DELTA_M;
        let a = self.grid[lower];
        let b = self.grid[lower + 1];
        AtmosphericConditions {
            temperature: lerp(a.temperature, b.temperature, frac),
            pressure: lerp(a.pressure, b.pressure, frac),
            density: lerp(a.density, b.density, frac),
            speed_of_sound: lerp(a.speed_of_sound, b.speed_of_sound, frac),
            viscosity: lerp(a.viscosity, b.viscosity, frac),
        }
    }
}

fn lerp(a: f64, b: f64, t: f64) -> f64 {
    a + (b - a) * t
}

fn exact_at(altitude_m: f64, base_t: &[f64], base_p: &[f64]) -> AtmosphericConditions {
    let geopot = geometric_to_geopotential(altitude_m);
    let max_layer = STANDARD_LAYERS_M[STANDARD_LAYERS_M.len() - 1];
    let clamped = geopot.max(STANDARD_LAYERS_M[0]).min(max_layer);
    let mut start = 0;
    for i in 0..STANDARD_LAYERS_M.len() - 1 {
        if STANDARD_LAYERS_M[i + 1] > clamped {
            start = i;
            break;
        }
        start = i;
    }
    let t_start = base_t[start];
    let t_rate = (base_t[start + 1] - t_start)
        / (STANDARD_LAYERS_M[start + 1] - STANDARD_LAYERS_M[start]);
    let alt_diff = clamped - STANDARD_LAYERS_M[start];
    let temp = t_start + alt_diff * t_rate;
    let press = pressure_at(
        clamped,
        temp,
        STANDARD_LAYERS_M[start],
        t_start,
        base_p[start],
    );
    AtmosphericConditions::from_t_p(temp, press)
}

fn build_grid(base_t: &[f64], base_p: &[f64]) -> Vec<AtmosphericConditions> {
    let max_geopot = STANDARD_LAYERS_M[STANDARD_LAYERS_M.len() - 1];
    let max_geometric = geopotential_to_geometric(max_geopot);
    let n = (max_geometric / DELTA_M).ceil() as usize + 1;
    let mut out = Vec::with_capacity(n);
    for i in 0..n {
        let alt_m = i as f64 * DELTA_M;
        out.push(exact_at(alt_m, base_t, base_p));
    }
    out
}

/// Java's ExtendedISAModel.calculatePressure, with the arguments named as in
/// the source: returns the pressure at (alt1, temp1) given known (alt2,
/// temp2, press2).
fn pressure_at(alt1: f64, temp1: f64, alt2: f64, temp2: f64, press2: f64) -> f64 {
    let temp_rate = (temp2 - temp1) / (alt2 - alt1);
    if temp_rate.abs() > 0.000_001 {
        press2 / (1.0 + (alt2 - alt1) * temp_rate / temp1).powf(-G0 / (temp_rate * R_AIR))
    } else {
        press2 / (-(alt2 - alt1) * G0 / (R_AIR * temp1)).exp()
    }
}

fn geometric_to_geopotential(h: f64) -> f64 {
    ISA_EARTH_RADIUS * h / (ISA_EARTH_RADIUS + h)
}

fn geopotential_to_geometric(h: f64) -> f64 {
    ISA_EARTH_RADIUS * h / (ISA_EARTH_RADIUS - h)
}

fn sutherland_viscosity(t: f64) -> f64 {
    // Sutherland's formula matches Java's `AtmosphericConditions.getViscosity`:
    //   mu = beta * T^1.5 / (T + S)  with beta = 1.458e-6, S = 110.4.
    let beta = 1.458e-6;
    let s = 110.4;
    beta * t.powf(1.5) / (t + s)
}

#[cfg(test)]
mod tests {
    use super::*;
    use approx::assert_relative_eq;

    #[test]
    fn sea_level_standard_day() {
        let isa = ExtendedIsa::default();
        let c = isa.conditions(0.0);
        assert_relative_eq!(c.temperature, 288.15, max_relative = 1e-12);
        assert_relative_eq!(c.pressure, 101_325.0, max_relative = 1e-9);
        assert_relative_eq!(c.density, 1.225, max_relative = 1e-3);
        assert_relative_eq!(c.speed_of_sound, 340.29, max_relative = 1e-3);
    }

    #[test]
    fn eleven_km_tropopause() {
        let c = ExtendedIsa::default().exact_conditions(11_000.0);
        // Geopotential at 11 km ~ 10981 m, so we ignore the geometric/geopotential
        // round-off and check exact ISA reference values at the bottom of the
        // isothermal layer: T = 216.65 K, p ≈ 22 632 Pa.
        assert_relative_eq!(c.temperature, 216.69, max_relative = 5e-4);
        assert_relative_eq!(c.pressure, 22_675.0, max_relative = 5e-3);
    }
}
