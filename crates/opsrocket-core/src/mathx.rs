//! Math helpers ported from `info.openrocket.core.util.MathUtil`.
//!
//! These are kept tiny and pure so they can serve as a one-to-one numerical
//! reference against the Java implementation. Watch out for surprises: Java's
//! `Math.atan2` / `Math.sqrt` use the JVM intrinsics which may differ from
//! Rust's `f64` methods in the last bit. We re-export the standard `f64`
//! methods and add only the helpers OpenRocket itself defines.

#[inline]
pub fn clamp(x: f64, lo: f64, hi: f64) -> f64 {
    if x < lo {
        lo
    } else if x > hi {
        hi
    } else {
        x
    }
}

#[inline]
pub fn safe_sqrt(x: f64) -> f64 {
    if x <= 0.0 {
        0.0
    } else {
        x.sqrt()
    }
}

#[inline]
pub fn pow2(x: f64) -> f64 {
    x * x
}

#[inline]
pub fn pow3(x: f64) -> f64 {
    x * x * x
}

#[inline]
pub fn hypot3(x: f64, y: f64, z: f64) -> f64 {
    (x * x + y * y + z * z).sqrt()
}

/// Linear interpolation: returns `a + (b - a) * t`.
#[inline]
pub fn lerp(a: f64, b: f64, t: f64) -> f64 {
    a + (b - a) * t
}

/// Map `x` from `[a, b]` to `[c, d]`.
#[inline]
pub fn map(x: f64, a: f64, b: f64, c: f64, d: f64) -> f64 {
    c + (d - c) * (x - a) / (b - a)
}

#[cfg(test)]
mod tests {
    use super::*;
    use approx::assert_relative_eq;

    #[test]
    fn lerp_endpoints() {
        assert_relative_eq!(lerp(1.0, 3.0, 0.0), 1.0);
        assert_relative_eq!(lerp(1.0, 3.0, 1.0), 3.0);
        assert_relative_eq!(lerp(1.0, 3.0, 0.5), 2.0);
    }

    #[test]
    fn clamp_basics() {
        assert_eq!(clamp(0.5, 0.0, 1.0), 0.5);
        assert_eq!(clamp(-1.0, 0.0, 1.0), 0.0);
        assert_eq!(clamp(2.0, 0.0, 1.0), 1.0);
    }
}
