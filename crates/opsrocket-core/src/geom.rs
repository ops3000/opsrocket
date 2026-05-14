//! Geometry primitives.
//!
//! Ported from `info.openrocket.core.util.Coordinate` / `Vector3D`.
//!
//! OpenRocket's `Coordinate` carries a fourth scalar called "weight" that is
//! used to represent mass when accumulating CG contributions. We keep that
//! same convention here so mass-property math stays a direct port.

use nalgebra::Vector3;
use serde::{Deserialize, Serialize};

pub type Vec3 = Vector3<f64>;

/// Position with an associated scalar weight (mass).
///
/// Direct port of `info.openrocket.core.util.Coordinate`.
#[derive(Debug, Clone, Copy, PartialEq, Default, Serialize, Deserialize)]
pub struct Coord {
    pub x: f64,
    pub y: f64,
    pub z: f64,
    pub weight: f64,
}

impl Coord {
    pub const ZERO: Coord = Coord { x: 0.0, y: 0.0, z: 0.0, weight: 0.0 };
    pub const NUL: Coord = Self::ZERO;

    pub const fn new(x: f64, y: f64, z: f64) -> Self {
        Self { x, y, z, weight: 0.0 }
    }

    pub const fn new_w(x: f64, y: f64, z: f64, weight: f64) -> Self {
        Self { x, y, z, weight }
    }

    pub fn from_vec(v: Vec3) -> Self {
        Self { x: v.x, y: v.y, z: v.z, weight: 0.0 }
    }

    pub fn to_vec(&self) -> Vec3 {
        Vec3::new(self.x, self.y, self.z)
    }

    pub fn length(&self) -> f64 {
        (self.x * self.x + self.y * self.y + self.z * self.z).sqrt()
    }

    pub fn length2(&self) -> f64 {
        self.x * self.x + self.y * self.y + self.z * self.z
    }

    pub fn add(&self, other: Coord) -> Coord {
        Coord {
            x: self.x + other.x,
            y: self.y + other.y,
            z: self.z + other.z,
            weight: self.weight + other.weight,
        }
    }

    pub fn sub(&self, other: Coord) -> Coord {
        Coord {
            x: self.x - other.x,
            y: self.y - other.y,
            z: self.z - other.z,
            weight: self.weight - other.weight,
        }
    }

    /// Component-wise multiplication of position by scalar (weight unchanged).
    pub fn mul(&self, s: f64) -> Coord {
        Coord { x: self.x * s, y: self.y * s, z: self.z * s, weight: self.weight }
    }

    /// Combine `self` and `other` into a single weighted centroid.
    ///
    /// This is the operation used to roll up CG contributions across child
    /// components.  Matches `Coordinate.average` semantics: position is the
    /// weighted average of the two positions; weight is the sum.  If both
    /// weights are zero, the result has zero weight at the unweighted
    /// midpoint.
    pub fn average(&self, other: Coord) -> Coord {
        let w = self.weight + other.weight;
        if w.abs() < f64::EPSILON {
            Coord::new(
                (self.x + other.x) * 0.5,
                (self.y + other.y) * 0.5,
                (self.z + other.z) * 0.5,
            )
        } else {
            Coord {
                x: (self.x * self.weight + other.x * other.weight) / w,
                y: (self.y * self.weight + other.y * other.weight) / w,
                z: (self.z * self.weight + other.z * other.weight) / w,
                weight: w,
            }
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use approx::assert_relative_eq;

    #[test]
    fn average_combines_weighted_centroid() {
        let a = Coord::new_w(0.0, 0.0, 0.0, 1.0);
        let b = Coord::new_w(2.0, 0.0, 0.0, 3.0);
        let c = a.average(b);
        assert_relative_eq!(c.x, 1.5);
        assert_relative_eq!(c.weight, 4.0);
    }

    #[test]
    fn average_zero_weight_is_midpoint() {
        let a = Coord::new(0.0, 0.0, 0.0);
        let b = Coord::new(4.0, 0.0, 0.0);
        let c = a.average(b);
        assert_relative_eq!(c.x, 2.0);
        assert_relative_eq!(c.weight, 0.0);
    }

    #[test]
    fn length_pythagoras() {
        let v = Coord::new(3.0, 4.0, 0.0);
        assert_relative_eq!(v.length(), 5.0);
    }
}
