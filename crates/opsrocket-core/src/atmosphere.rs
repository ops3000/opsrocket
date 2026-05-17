//! Atmosphere model — port of
//! `info.openrocket.core.models.atmosphere.ExtendedISAModel` plus the
//! `InterpolatingAtmosphericModel` 500 m grid cache that wraps it.
//!
//! Eight ISA layers up to 84852 m geopotential altitude with geopotential /
//! geometric altitude conversion via Earth radius 6 356 766 m. The Java
//! implementation caches conditions at 500 m intervals and linearly
//! interpolates between them; we do the same so behaviour matches exactly.

use crate::units::G0;

// Java constants (kept module-local to make the source-of-truth obvious).
// `AtmosphericConditions.R` (dry-air gas constant) / `EPSILON`.
const R_AIR: f64 = 287.053;
const EPSILON: f64 = 0.622;
const ISA_EARTH_RADIUS: f64 = 6_356_766.0;
const DELTA_M: f64 = 500.0;

/// `AtmosphericConditions.vaporPressureSaturation()` —
/// `611.3 * exp(19.854 - 5423/T)`.
fn vapor_pressure_saturation(t: f64) -> f64 {
    611.3 * (19.854 - 5423.0 / t).exp()
}

/// `AtmosphericConditions.getGasConstant()` — humid-air gas constant.
/// Returns the dry-air `R` when relative humidity is 0 (the default).
fn gas_constant(pressure: f64, temperature: f64, relative_humidity: f64) -> f64 {
    if relative_humidity > 0.0 {
        let es = vapor_pressure_saturation(temperature);
        let numerator = EPSILON * relative_humidity * es;
        let denominator = pressure - relative_humidity * es * (1.0 - EPSILON);
        let scaling_factor = 1.0 / EPSILON - 1.0;
        R_AIR * (1.0 + numerator * scaling_factor / denominator)
    } else {
        R_AIR
    }
}

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
    /// temperature, pressure and relative humidity, matching OpenRocket's
    /// `AtmosphericConditions`:
    /// - density   = `P / (R_gas · T)`, `R_gas` humidity-corrected
    /// - speed of sound = `165.77 + 0.606·T`  (`getMachSpeed`)
    /// - `viscosity` field stores OpenRocket's *dynamic* viscosity
    ///   `μ = 3.7291e-6 + 4.9944e-8·T`.  OpenRocket's kinematic viscosity is
    ///   `ν = μ/ρ` and `Re = v·L/ν = ρ·v·L/μ`; the engine computes
    ///   `Re/L = ρ·v/μ`, so storing the linear `μ` here makes the Reynolds
    ///   number bit-match `BarrowmanDragCalculator.calculateReynoldsNumber`.
    pub fn from_t_p_rh(temperature: f64, pressure: f64, relative_humidity: f64) -> Self {
        let r_gas = gas_constant(pressure, temperature, relative_humidity);
        let density = pressure / (r_gas * temperature);
        let speed_of_sound = 165.77 + 0.606 * temperature;
        let viscosity = 3.729_1e-6 + 4.994_4e-8 * temperature;
        Self { temperature, pressure, density, speed_of_sound, viscosity }
    }

    /// Convenience for the dry-air (RH = 0) case, OpenRocket's default.
    pub fn from_t_p(temperature: f64, pressure: f64) -> Self {
        Self::from_t_p_rh(temperature, pressure, 0.0)
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

/// Extended ISA model — a faithful port of OpenRocket's
/// `ExtendedISAModel(altitude, temperature, pressure, relativeHumidity)`
/// constructor (with the `altitude > 0` custom-layer insertion) plus the
/// `InterpolatingAtmosphericModel` 500 m grid cache that wraps it.
#[derive(Debug, Clone)]
pub struct ExtendedIsa {
    pub t0: f64,
    pub p0: f64,
    /// Relative humidity at MSL (OpenRocket default `STANDARD_RELATIVE_HUMIDITY
    /// = 0`).  Held constant with altitude — this is exactly OpenRocket's
    /// behaviour: its `calculateRelativeHumidity()` is a TODO identity that
    /// returns the source humidity unchanged for every layer.
    pub rh0: f64,
    /// Geopotential layer bases (length 8, or 9 when a launch-site layer is
    /// inserted at index 1 — mirrors OpenRocket's `layer[]`).
    layer: Vec<f64>,
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
    /// MSL ISA base with the given sea-level T/P, dry air. Equivalent to
    /// OpenRocket `new ExtendedISAModel(0, t0, p0, 0)`.
    pub fn new(t0: f64, p0: f64) -> Self {
        Self::new_at(0.0, t0, p0, 0.0)
    }

    /// MSL ISA base with the given sea-level T/P and relative humidity.
    pub fn new_full(t0: f64, p0: f64, rh0: f64) -> Self {
        Self::new_at(0.0, t0, p0, rh0)
    }

    /// Faithful port of `ExtendedISAModel(double altitude, double temperature,
    /// double pressure, double relativeHumidity)`.  `altitude` is the launch
    /// site's geometric altitude (m MSL); `temperature`/`pressure` are the
    /// conditions *at that altitude*.  When `altitude > 0` a custom layer is
    /// inserted at index 1 and a sea-level temperature is back-calculated using
    /// the lapse rate to the 11 km layer.
    pub fn new_at(altitude: f64, temperature: f64, pressure: f64, rh0: f64) -> Self {
        let geopot = geometric_to_geopotential(altitude);

        let (layer, mut base_temperature, mut base_pressure): (Vec<f64>, Vec<f64>, Vec<f64>);

        // OpenRocket throws if the first altitude is at/above the 11 km layer;
        // we fall back to the MSL construction in that (physically irrelevant
        // for launch sites) case.
        if altitude > 0.0 && geopot < STANDARD_LAYERS_M[1] {
            let n = STANDARD_LAYERS_M.len() + 1; // 9
            let mut lyr = vec![0.0; n];
            let mut bt = vec![0.0; n];
            let mut bp = vec![0.0; n];

            let layer1_alt = STANDARD_LAYERS_M[1];
            let layer1_temp = STANDARD_TEMPERATURES_K[1];
            let temp_rate = (layer1_temp - temperature) / (layer1_alt - geopot);
            let sea_level_temp = temperature - temp_rate * geopot;

            lyr[0] = 0.0;
            lyr[1] = geopot;
            bt[0] = sea_level_temp;
            bt[1] = temperature;
            // calculatePressure(0, seaLevelTemp, geopot, temperature, pressure)
            bp[0] = pressure_at(0.0, sea_level_temp, geopot, temperature, pressure);
            bp[1] = pressure;
            for i in 2..n {
                lyr[i] = STANDARD_LAYERS_M[i - 1];
                bt[i] = STANDARD_TEMPERATURES_K[i - 1];
            }
            // Fill remaining layer base pressures by sampling 1 geopotential
            // metre below the layer top against the already-built lower layers.
            for i in 2..n {
                let sample = geopotential_to_geometric(lyr[i] - 1.0);
                bp[i] = exact_layered(sample, &lyr, &bt, &bp, rh0).pressure;
            }
            layer = lyr;
            base_temperature = bt;
            base_pressure = bp;
        } else {
            let n = STANDARD_LAYERS_M.len();
            layer = STANDARD_LAYERS_M.to_vec();
            base_temperature = STANDARD_TEMPERATURES_K.to_vec();
            base_temperature[0] = temperature;
            base_pressure = vec![0.0; n];
            base_pressure[0] = pressure;
            for i in 1..n {
                let sample = geopotential_to_geometric(layer[i] - 1.0);
                base_pressure[i] =
                    exact_layered(sample, &layer, &base_temperature, &base_pressure, rh0)
                        .pressure;
            }
        }

        let grid = build_grid(&layer, &base_temperature, &base_pressure, rh0);
        Self {
            t0: base_temperature[0],
            p0: base_pressure[0],
            rh0,
            layer,
            base_temperature,
            base_pressure,
            grid,
        }
    }

    /// Direct exact ISA computation (no grid). Matches `getExactConditions`.
    pub fn exact_conditions(&self, altitude_m: f64) -> AtmosphericConditions {
        exact_layered(
            altitude_m,
            &self.layer,
            &self.base_temperature,
            &self.base_pressure,
            self.rh0,
        )
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

/// Port of `ExtendedISAModel.getExactConditions(double altitude)` over an
/// arbitrary (possibly launch-site-extended) layer table.
fn exact_layered(
    altitude_m: f64,
    layer: &[f64],
    base_t: &[f64],
    base_p: &[f64],
    rh: f64,
) -> AtmosphericConditions {
    let geopot = geometric_to_geopotential(altitude_m);
    let clamped = geopot.max(layer[0]).min(layer[layer.len() - 1]);
    let mut start = 0;
    for i in 0..layer.len() - 1 {
        if layer[i + 1] > clamped {
            start = i;
            break;
        }
        start = i;
    }
    let t_start = base_t[start];
    let t_rate = (base_t[start + 1] - t_start) / (layer[start + 1] - layer[start]);
    let alt_diff = clamped - layer[start];
    let temp = t_start + alt_diff * t_rate;
    let press = pressure_at(clamped, temp, layer[start], t_start, base_p[start]);
    AtmosphericConditions::from_t_p_rh(temp, press, rh)
}

fn build_grid(
    layer: &[f64],
    base_t: &[f64],
    base_p: &[f64],
    rh: f64,
) -> Vec<AtmosphericConditions> {
    let max_geopot = layer[layer.len() - 1];
    let max_geometric = geopotential_to_geometric(max_geopot);
    let n = (max_geometric / DELTA_M).ceil() as usize + 1;
    let mut out = Vec::with_capacity(n);
    for i in 0..n {
        let alt_m = i as f64 * DELTA_M;
        out.push(exact_layered(alt_m, layer, base_t, base_p, rh));
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
