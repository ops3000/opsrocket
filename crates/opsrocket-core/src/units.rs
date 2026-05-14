//! Unit conversion constants and helpers.
//!
//! OpenRocket stores all values in SI (metres, kilograms, seconds, radians,
//! Pascals, Kelvin). External I/O occasionally needs other units but the
//! simulation engine never sees them; conversions happen at the file boundary.

pub const G0: f64 = 9.80665; // standard gravity, m/s^2
pub const R_AIR: f64 = 287.05287; // specific gas constant of dry air, J/(kg·K)
pub const GAMMA_AIR: f64 = 1.4; // ratio of specific heats for air
pub const ABSOLUTE_ZERO: f64 = -273.15; // °C
pub const PI: f64 = std::f64::consts::PI;
pub const TWO_PI: f64 = std::f64::consts::TAU;

#[inline]
pub fn deg_to_rad(deg: f64) -> f64 {
    deg * PI / 180.0
}
#[inline]
pub fn rad_to_deg(rad: f64) -> f64 {
    rad * 180.0 / PI
}
#[inline]
pub fn ft_to_m(ft: f64) -> f64 {
    ft * 0.3048
}
#[inline]
pub fn m_to_ft(m: f64) -> f64 {
    m / 0.3048
}
#[inline]
pub fn in_to_m(inches: f64) -> f64 {
    inches * 0.0254
}
#[inline]
pub fn lb_to_kg(lb: f64) -> f64 {
    lb * 0.45359237
}
