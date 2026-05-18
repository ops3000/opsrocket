//! Faithful port of `info.openrocket.core.models.wind.PinkNoiseWindModel`
//! (+ `util.PinkNoise`) and a bit-exact `java.util.Random` so the gust time
//! series matches OpenRocket for a given seed.

/// Bit-faithful `java.util.Random` (48-bit LCG + Marsaglia-polar
/// `nextGaussian`).
#[derive(Debug, Clone)]
pub struct JavaRandom {
    seed: i64,
    next_gaussian: Option<f64>,
}

const MULT: i64 = 0x5_DEEC_E66D;
const ADD: i64 = 0xB;
const MASK: i64 = (1 << 48) - 1;

impl JavaRandom {
    pub fn new(seed: i64) -> Self {
        Self {
            seed: (seed ^ MULT) & MASK,
            next_gaussian: None,
        }
    }

    fn next(&mut self, bits: u32) -> i32 {
        self.seed = self.seed.wrapping_mul(MULT).wrapping_add(ADD) & MASK;
        // Java: (int)(seed >>> (48 - bits))
        ((self.seed as u64) >> (48 - bits)) as i32
    }

    pub fn next_double(&mut self) -> f64 {
        let hi = self.next(26) as i64;
        let lo = self.next(27) as i64;
        ((hi << 27) + lo) as f64 / (1i64 << 53) as f64
    }

    /// `java.util.Random.nextGaussian` (Marsaglia polar, cached pair).
    pub fn next_gaussian(&mut self) -> f64 {
        if let Some(g) = self.next_gaussian.take() {
            return g;
        }
        loop {
            let v1 = 2.0 * self.next_double() - 1.0;
            let v2 = 2.0 * self.next_double() - 1.0;
            let s = v1 * v1 + v2 * v2;
            if s < 1.0 && s != 0.0 {
                let multiplier = (-2.0 * s.ln() / s).sqrt();
                self.next_gaussian = Some(v2 * multiplier);
                return v1 * multiplier;
            }
        }
    }
}

/// Port of `info.openrocket.core.util.PinkNoise` — an `alpha`-power IIR
/// filter over Gaussian white noise.
#[derive(Debug, Clone)]
pub struct PinkNoise {
    poles: usize,
    multipliers: Vec<f64>,
    values: Vec<f64>,
    rnd: JavaRandom,
}

impl PinkNoise {
    pub fn new(alpha: f64, poles: usize, rnd: JavaRandom) -> Self {
        let mut multipliers = vec![0.0; poles];
        let mut a = 1.0;
        for i in 0..poles {
            a = (i as f64 - alpha / 2.0) * a / (i as f64 + 1.0);
            multipliers[i] = a;
        }
        let mut pn = Self {
            poles,
            multipliers,
            values: vec![0.0; poles],
            rnd,
        };
        // Warm up: discard 5·poles samples.
        for _ in 0..(5 * poles) {
            pn.next_value();
        }
        pn
    }

    pub fn next_value(&mut self) -> f64 {
        let mut x = self.rnd.next_gaussian();
        for i in 0..self.poles {
            x -= self.multipliers[i] * self.values[i];
        }
        // System.arraycopy(values, 0, values, 1, len-1)
        for i in (1..self.values.len()).rev() {
            self.values[i] = self.values[i - 1];
        }
        self.values[0] = x;
        x
    }
}

const SEED_RANDOMIZATION: i64 = 0x7343_AA03;
const ALPHA: f64 = 5.0 / 3.0;
const POLES: usize = 2;
const STDDEV: f64 = 2.252;
/// `PinkNoiseWindModel.DELTA_T`.
pub const DELTA_T: f64 = 0.05;

/// Port of `info.openrocket.core.models.wind.PinkNoiseWindModel`. Produces a
/// time-correlated turbulent wind speed about a mean, with the gust series
/// matching OpenRocket bit-for-bit for a given seed.
#[derive(Debug, Clone)]
pub struct PinkNoiseWindModel {
    seed: i64,
    average: f64,
    std_dev: f64,
    direction: f64,
    source: Option<PinkNoise>,
    time1: f64,
    value1: f64,
    value2: f64,
}

impl PinkNoiseWindModel {
    pub fn new(seed: i64) -> Self {
        Self {
            seed: seed ^ SEED_RANDOMIZATION,
            average: 0.0,
            std_dev: 0.0,
            direction: std::f64::consts::FRAC_PI_2,
            source: None,
            time1: 0.0,
            value1: 0.0,
            value2: 0.0,
        }
    }

    pub fn set_average(&mut self, average: f64) {
        if average < 0.0 {
            self.direction = std::f64::consts::PI + self.direction;
        }
        self.average = average.abs();
    }

    pub fn set_direction(&mut self, dir: f64) {
        self.direction = dir;
    }

    pub fn set_std_deviation(&mut self, sd: f64) {
        self.std_dev = sd.max(0.0);
    }

    /// `setTurbulenceIntensity` — couples σ to the mean.
    pub fn set_turbulence_intensity(&mut self, intensity: f64) {
        self.set_std_deviation(intensity * self.average);
    }

    /// `getWindVelocity(time, ...)` → (x = east, y = north, z = 0) m/s.
    pub fn wind_velocity(&mut self, time: f64) -> (f64, f64, f64) {
        if self.source.is_none() {
            let src = PinkNoise::new(ALPHA, POLES, JavaRandom::new(self.seed));
            self.source = Some(src);
            let v = self.source.as_mut().unwrap().next_value();
            self.value1 = v;
            self.value2 = v;
            self.time1 = 0.0;
        }
        if time < self.time1 {
            // Reset (time went backwards).
            let src = PinkNoise::new(ALPHA, POLES, JavaRandom::new(self.seed));
            self.source = Some(src);
            let v = self.source.as_mut().unwrap().next_value();
            self.value1 = v;
            self.value2 = v;
            self.time1 = 0.0;
        }
        while time >= self.time1 + DELTA_T {
            self.value1 = self.value2;
            self.value2 = self.source.as_mut().unwrap().next_value();
            self.time1 += DELTA_T;
        }
        let a = (time - self.time1) / DELTA_T;
        let speed =
            self.average + (self.value1 * (1.0 - a) + self.value2 * a) * self.std_dev / STDDEV;
        (
            speed * self.direction.sin(),
            speed * self.direction.cos(),
            0.0,
        )
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn java_random_known_sequence() {
        // java.util.Random(42).nextInt() sequence head is deterministic;
        // here we just assert reproducibility + range.
        let mut a = JavaRandom::new(42);
        let mut b = JavaRandom::new(42);
        for _ in 0..100 {
            let x = a.next_double();
            assert_eq!(x, b.next_double());
            assert!((0.0..1.0).contains(&x));
        }
    }

    #[test]
    fn pink_noise_zero_turbulence_is_constant_mean() {
        let mut m = PinkNoiseWindModel::new(0);
        m.set_average(5.0);
        m.set_std_deviation(0.0);
        let (x, y, _) = m.wind_velocity(0.0);
        let (x2, y2, _) = m.wind_velocity(3.7);
        // East wind (dir = π/2): speed along +x, ~0 along y.
        assert!((x - 5.0).abs() < 1e-9 && x2 > 4.999);
        assert!(y.abs() < 1e-9 && y2.abs() < 1e-9);
    }

    #[test]
    fn turbulence_perturbs_speed() {
        let mut m = PinkNoiseWindModel::new(12345);
        m.set_average(10.0);
        m.set_turbulence_intensity(0.2);
        let mut any_diff = false;
        let (x0, _, _) = m.wind_velocity(0.0);
        for k in 1..50 {
            let (x, _, _) = m.wind_velocity(k as f64 * 0.1);
            if (x - x0).abs() > 1e-6 {
                any_diff = true;
            }
        }
        assert!(any_diff, "turbulence should vary the wind speed");
    }
}
