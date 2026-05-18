//! Faithful port of `info.openrocket.core.masscalc.RigidBody` — a rigid body
//! described by its CM (with mass = `cm.weight`) and the three principal
//! moments of inertia, with the 3-axis parallel-axis rebase and `add`.

use crate::geom::Coord;

#[derive(Debug, Clone, Copy)]
pub struct RigidBody {
    /// Centre of mass; `cm.weight` is the body mass (kg).
    pub cm: Coord,
    /// Roll moment of inertia (about the x/longitudinal axis), kg·m².
    pub ixx: f64,
    /// Pitch moment of inertia (about y), kg·m².
    pub iyy: f64,
    /// Yaw moment of inertia (about z), kg·m².
    pub izz: f64,
}

impl RigidBody {
    pub const EMPTY: RigidBody = RigidBody {
        cm: Coord::ZERO,
        ixx: 0.0,
        iyy: 0.0,
        izz: 0.0,
    };

    pub fn new(cm: Coord, ixx: f64, iyy: f64, izz: f64) -> Self {
        Self { cm, ixx, iyy, izz }
    }

    pub fn mass(&self) -> f64 {
        self.cm.weight
    }

    /// `RigidBody.rebase(newLocation)` — parallel-axis shift of the three
    /// inertias to a new reference point. Uses the body's own mass.
    pub fn rebase(&self, new_location: Coord) -> RigidBody {
        let m = self.cm.weight;
        let dx = self.cm.x - new_location.x;
        let dy = self.cm.y - new_location.y;
        let dz = self.cm.z - new_location.z;
        RigidBody {
            cm: Coord::new_w(new_location.x, new_location.y, new_location.z, m),
            ixx: self.ixx + m * (dy * dy + dz * dz),
            iyy: self.iyy + m * (dx * dx + dz * dz),
            izz: self.izz + m * (dx * dx + dy * dy),
        }
    }

    /// `RigidBody.add(that)` — combine two bodies: new CM is the weighted
    /// average; both are rebased to it and the inertias summed.
    pub fn add(&self, that: &RigidBody) -> RigidBody {
        let new_cm = self.cm.average(that.cm);
        let a = self.rebase(new_cm);
        let b = that.rebase(new_cm);
        RigidBody {
            cm: new_cm,
            ixx: a.ixx + b.ixx,
            iyy: a.iyy + b.iyy,
            izz: a.izz + b.izz,
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn parallel_axis_point_mass() {
        // A 2 kg point mass at x=1 has zero MOI about itself; about the
        // origin Iyy = Izz = m·x² = 2.
        let pm = RigidBody::new(Coord::new_w(1.0, 0.0, 0.0, 2.0), 0.0, 0.0, 0.0);
        let r = pm.rebase(Coord::ZERO);
        assert!((r.iyy - 2.0).abs() < 1e-12);
        assert!((r.izz - 2.0).abs() < 1e-12);
        assert!(r.ixx.abs() < 1e-12);
    }

    #[test]
    fn add_two_point_masses_offaxis() {
        // 1 kg at y=+1 and 1 kg at y=-1 → CM at origin, Ixx = Izz = 2.
        let a = RigidBody::new(Coord::new_w(0.0, 1.0, 0.0, 1.0), 0.0, 0.0, 0.0);
        let b = RigidBody::new(Coord::new_w(0.0, -1.0, 0.0, 1.0), 0.0, 0.0, 0.0);
        let c = a.add(&b);
        assert!(c.cm.y.abs() < 1e-12);
        assert!((c.ixx - 2.0).abs() < 1e-12); // y²+z² about x
        assert!((c.izz - 2.0).abs() < 1e-12); // x²+y² about z
        assert!(c.iyy.abs() < 1e-12);
    }
}
