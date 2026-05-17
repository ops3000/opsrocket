//! Gravity and geodetic models — faithful ports of
//! `info.openrocket.core.models.gravity.{WGSGravityModel,ConstantGravityModel}`
//! and `info.openrocket.core.util.GeodeticComputationStrategy`
//! (+ `WorldCoordinate`).

use crate::geom::Vec3;

/// `WorldCoordinate.REARTH` (m).
pub const REARTH: f64 = 6_371_000.0;
/// `WorldCoordinate.EROT` — Earth rotation rate (rad/s).
pub const EROT: f64 = 7.292_115_0e-5;

/// Port of `info.openrocket.core.util.WorldCoordinate`.
#[derive(Debug, Clone, Copy, PartialEq)]
pub struct WorldCoordinate {
    /// Latitude (radians), clamped to ±π/2.
    pub lat: f64,
    /// Longitude (radians), reduced to (−π, π].
    pub lon: f64,
    /// Altitude (m MSL), unbounded.
    pub alt: f64,
}

fn reduce_pi(x: f64) -> f64 {
    use std::f64::consts::{PI, TAU};
    let mut v = x % TAU;
    if v <= -PI {
        v += TAU;
    } else if v > PI {
        v -= TAU;
    }
    v
}

impl WorldCoordinate {
    /// `new WorldCoordinate(latDeg, lonDeg, alt)`.
    pub fn from_degrees(lat_deg: f64, lon_deg: f64, alt: f64) -> Self {
        use std::f64::consts::FRAC_PI_2;
        Self {
            lat: lat_deg.to_radians().clamp(-FRAC_PI_2, FRAC_PI_2),
            lon: reduce_pi(lon_deg.to_radians()),
            alt,
        }
    }
    pub fn with_alt(self, alt: f64) -> Self {
        Self { alt, ..self }
    }
}

/// `info.openrocket.core.models.gravity.GravityModel`.
#[derive(Debug, Clone, Copy, PartialEq)]
pub enum GravityModel {
    /// `WGSGravityModel` (OpenRocket default).
    Wgs,
    /// `ConstantGravityModel(value)` (OpenRocket constant default 9.807).
    Constant(f64),
}

impl GravityModel {
    /// `GravityModel.getGravity(WorldCoordinate)`.
    pub fn gravity(&self, wc: &WorldCoordinate) -> f64 {
        match *self {
            GravityModel::Constant(g) => g,
            GravityModel::Wgs => {
                // WGSGravityModel.calcGravity
                let sin2lat = wc.lat.sin().powi(2);
                let g_0 = 9.780_326_7714
                    * ((1.0 + 0.001_931_851_386_39 * sin2lat)
                        / (1.0 - 0.006_694_379_990_13 * sin2lat).sqrt());
                g_0 * (REARTH / (REARTH + wc.alt)).powi(2)
            }
        }
    }
}

/// `info.openrocket.core.util.GeodeticComputationStrategy`.
/// OpenRocket's default is `SPHERICAL`.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum GeodeticComputation {
    Flat,
    Spherical,
    Wgs84,
}

const PRECISION_LIMIT: f64 = 0.5e-13;
const FLAT_M_PER_DEG_LAT: f64 = 111_325.0;
const FLAT_M_PER_DEG_LON_EQ: f64 = 111_050.0;

impl GeodeticComputation {
    /// `GeodeticComputationStrategy.addCoordinate(location, delta)`.
    /// `delta` is the cartesian movement: x = east, y = north, z = up (m).
    pub fn add_coordinate(&self, loc: &WorldCoordinate, delta: Vec3) -> WorldCoordinate {
        let new_alt = loc.alt + delta.z;
        match self {
            GeodeticComputation::Flat => {
                let mut m_per_deg_lon = FLAT_M_PER_DEG_LON_EQ * loc.lat.cos();
                m_per_deg_lon = m_per_deg_lon.max(1.0);
                let new_lat = loc.lat.to_degrees() + delta.y / FLAT_M_PER_DEG_LAT;
                let new_lon = loc.lon.to_degrees() + delta.x / m_per_deg_lon;
                WorldCoordinate::from_degrees(new_lat, new_lon, new_alt)
            }
            GeodeticComputation::Spherical => {
                let d = (delta.x * delta.x + delta.y * delta.y).sqrt();
                if d == 0.0 {
                    return WorldCoordinate { alt: new_alt, ..*loc };
                }
                let bearing = delta.x.atan2(delta.y);
                let sin_lat = loc.lat.sin();
                let cos_lat = loc.lat.cos();
                let sin_dr = (d / REARTH).sin();
                let cos_dr = (d / REARTH).cos();
                let new_lat = (sin_lat * cos_dr + cos_lat * sin_dr * bearing.cos()).asin();
                let new_lon = loc.lon
                    + (bearing.sin() * sin_dr * cos_lat).atan2(cos_dr - sin_lat * new_lat.sin());
                WorldCoordinate::from_degrees(new_lat.to_degrees(), new_lon.to_degrees(), new_alt)
            }
            GeodeticComputation::Wgs84 => {
                let d = (delta.x * delta.x + delta.y * delta.y).sqrt();
                if d == 0.0 {
                    return WorldCoordinate { alt: new_alt, ..*loc };
                }
                let bearing = delta.x.atan2(delta.y);
                let (lat2, lon2) =
                    dirct1(loc.lat, loc.lon, bearing, d, 6_378_137.0, 1.0 / 298.257_222_100_88);
                WorldCoordinate::from_degrees(lat2.to_degrees(), lon2.to_degrees(), new_alt)
            }
        }
    }

    /// `GeodeticComputationStrategy.getCoriolisAcceleration(location, velocity)`.
    /// FLAT returns zero; SPHERICAL/WGS84 use `computeCoriolisAcceleration`.
    pub fn coriolis_acceleration(&self, loc: &WorldCoordinate, velocity: Vec3) -> Vec3 {
        if *self == GeodeticComputation::Flat {
            return Vec3::zeros();
        }
        let sinlat = loc.lat.sin();
        let coslat = loc.lat.cos();
        let v_n = velocity.y;
        let v_e = -velocity.x;
        let v_u = velocity.z;
        Vec3::new(
            2.0 * EROT * (v_n * sinlat - v_u * coslat),
            2.0 * EROT * (-v_e * sinlat),
            2.0 * EROT * (v_e * coslat),
        )
    }
}

/// Vincenty direct solution — port of `GeodeticComputationStrategy.dirct1`.
/// Returns `(lat2, lon2)` in radians.
#[allow(clippy::many_single_char_names)]
fn dirct1(glat1: f64, glon1: f64, azimuth: f64, dist: f64, axis: f64, flat: f64) -> (f64, f64) {
    let r = 1.0 - flat;
    let mut tu = r * glat1.sin() / glat1.cos();
    let sf = azimuth.sin();
    let cf = azimuth.cos();
    let mut baz = 0.0;
    if cf != 0.0 {
        baz = tu.atan2(cf) * 2.0;
    }
    let cu = 1.0 / (tu * tu + 1.0).sqrt();
    let su = tu * cu;
    let sa = cu * sf;
    let c2a = -sa * sa + 1.0;
    let mut x = ((1.0 / r / r - 1.0) * c2a + 1.0).sqrt() + 1.0;
    x = (x - 2.0) / x;
    let mut c = 1.0 - x;
    c = (x * x / 4.0 + 1.0) / c;
    let d = (0.375 * x * x - 1.0) * x;
    tu = dist / r / axis / c;
    let y0 = tu;
    let mut y = y0;
    let (mut sy, mut cy, mut cz, mut e);
    loop {
        sy = y.sin();
        cy = y.cos();
        cz = (baz + y).cos();
        e = cz * cz * 2.0 - 1.0;
        c = y;
        x = e * cy;
        y = e + e - 1.0;
        y = (((sy * sy * 4.0 - 3.0) * y * cz * d / 6.0 + x) * d / 4.0 - cz) * sy * d + tu;
        if (y - c).abs() <= PRECISION_LIMIT {
            break;
        }
    }
    baz = cu * cy * cf - su * sy;
    c = r * (sa * sa + baz * baz).sqrt();
    let dd = su * cy + cu * sy * cf;
    let glat2 = dd.atan2(c);
    c = cu * cy - su * sy * cf;
    x = (sy * sf).atan2(c);
    c = ((-3.0 * c2a + 4.0) * flat + 4.0) * c2a * flat / 16.0;
    let d2 = ((e * cy * c + cz) * sy * c + y) * sa;
    let glon2 = glon1 + x - (1.0 - c) * d2 * flat;
    (glat2, glon2)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn wgs_gravity_latitude_band() {
        // Equator vs pole at sea level (matches WGSGravityModel formula).
        let eq = GravityModel::Wgs.gravity(&WorldCoordinate::from_degrees(0.0, 0.0, 0.0));
        let pole = GravityModel::Wgs.gravity(&WorldCoordinate::from_degrees(90.0, 0.0, 0.0));
        assert!((eq - 9.780_326_7714).abs() < 1e-6);
        assert!(pole > eq && pole < 9.833);
    }

    #[test]
    fn constant_gravity_is_constant() {
        let g = GravityModel::Constant(9.807);
        assert_eq!(g.gravity(&WorldCoordinate::from_degrees(45.0, 0.0, 5000.0)), 9.807);
    }

    #[test]
    fn flat_no_coriolis() {
        let wc = WorldCoordinate::from_degrees(45.0, 0.0, 0.0);
        assert_eq!(
            GeodeticComputation::Flat.coriolis_acceleration(&wc, Vec3::new(1.0, 1.0, 1.0)),
            Vec3::zeros()
        );
    }
}
