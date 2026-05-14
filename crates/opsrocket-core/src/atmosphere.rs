//! Atmosphere models.
//!
//! Ported from `info.openrocket.core.models.atmosphere.ExtendedISAModel`.
//! Uses the International Standard Atmosphere through the stratosphere
//! (up to 32 km). Implements the standard temperature lapse-rate layers and
//! Sutherland's law for dynamic viscosity.

use crate::units::{G0, GAMMA_AIR, R_AIR};

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
}

/// Trait for any atmosphere model.
pub trait AtmosphereModel: Send + Sync {
    fn conditions(&self, altitude_m: f64) -> AtmosphericConditions;
}

/// International Standard Atmosphere (extended to 32 km).
///
/// Layers (geopotential altitude, lapse rate K/m, base temperature K):
///   0 -- 11000 m: -0.0065
///  11000 -- 20000 m:  0.0
///  20000 -- 32000 m: +0.0010
#[derive(Debug, Clone, Copy)]
pub struct ExtendedIsa {
    /// Sea-level temperature (K). Default 288.15.
    pub t0: f64,
    /// Sea-level pressure (Pa). Default 101325.
    pub p0: f64,
}

impl Default for ExtendedIsa {
    fn default() -> Self {
        Self { t0: 288.15, p0: 101_325.0 }
    }
}

impl AtmosphereModel for ExtendedIsa {
    fn conditions(&self, altitude_m: f64) -> AtmosphericConditions {
        let (t, p) = isa_layers(altitude_m, self.t0, self.p0);
        let density = p / (R_AIR * t);
        let speed_of_sound = (GAMMA_AIR * R_AIR * t).sqrt();
        let viscosity = sutherland_viscosity(t);
        AtmosphericConditions { temperature: t, pressure: p, density, speed_of_sound, viscosity }
    }
}

fn isa_layers(altitude: f64, t0: f64, p0: f64) -> (f64, f64) {
    // Standard ISA values are defined relative to a 288.15 K / 101325 Pa
    // base, but the model accepts a user-set sea-level point. We follow
    // OpenRocket's ExtendedISA which scales the standard column by the
    // ratios `t0/288.15` and `p0/101325` so a non-standard surface day
    // still produces consistent lapse behaviour.
    let h = altitude.max(0.0);
    let (t_base, p_base, h_base, lapse) = if h < 11_000.0 {
        (t0, p0, 0.0, -0.0065)
    } else if h < 20_000.0 {
        let (t11, p11) = layer_top(t0, p0, 0.0, -0.0065, 11_000.0);
        (t11, p11, 11_000.0, 0.0)
    } else {
        let (t11, p11) = layer_top(t0, p0, 0.0, -0.0065, 11_000.0);
        let (t20, p20) = layer_top(t11, p11, 11_000.0, 0.0, 20_000.0);
        (t20, p20, 20_000.0, 0.001)
    };
    layer_top(t_base, p_base, h_base, lapse, h)
}

fn layer_top(t_base: f64, p_base: f64, h_base: f64, lapse: f64, h: f64) -> (f64, f64) {
    let dh = h - h_base;
    if lapse.abs() < 1.0e-12 {
        // Isothermal layer
        let t = t_base;
        let p = p_base * (-G0 * dh / (R_AIR * t)).exp();
        (t, p)
    } else {
        let t = t_base + lapse * dh;
        let p = p_base * (t / t_base).powf(-G0 / (lapse * R_AIR));
        (t, p)
    }
}

fn sutherland_viscosity(t: f64) -> f64 {
    // Sutherland's formula, reference for air: mu_0 = 1.716e-5 Pa·s,
    // T_0 = 273.15 K, S = 110.4 K.
    let mu0 = 1.716e-5;
    let t0 = 273.15;
    let s = 110.4;
    mu0 * (t / t0).powf(1.5) * (t0 + s) / (t + s)
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
        assert_relative_eq!(c.pressure, 101_325.0, max_relative = 1e-12);
        // Density ≈ 1.225 kg/m^3 within 1e-3
        assert_relative_eq!(c.density, 1.225, max_relative = 1e-3);
        // Speed of sound at sea level ≈ 340.29 m/s
        assert_relative_eq!(c.speed_of_sound, 340.294, max_relative = 1e-3);
    }

    #[test]
    fn eleven_km_tropopause_matches_isa_tables() {
        let c = ExtendedIsa::default().conditions(11_000.0);
        assert_relative_eq!(c.temperature, 216.65, max_relative = 1e-4);
        // Standard pressure at 11 km ≈ 22 632 Pa
        assert_relative_eq!(c.pressure, 22_632.0, max_relative = 5e-4);
    }
}
