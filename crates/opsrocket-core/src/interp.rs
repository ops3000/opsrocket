//! Faithful ports of `info.openrocket.core.util.LinearInterpolator` and
//! `PolyInterpolator`, used by the Barrowman drag pipeline.

/// Port of `LinearInterpolator` (a sorted (x→y) map with clamped linear
/// interpolation).
#[derive(Debug, Clone, Default)]
pub struct LinearInterpolator {
    /// Sorted by x, deduplicated (last write wins, like `TreeMap.put`).
    points: Vec<(f64, f64)>,
}

impl LinearInterpolator {
    pub fn new() -> Self {
        Self { points: Vec::new() }
    }

    pub fn with_points(x: &[f64], y: &[f64]) -> Self {
        let mut s = Self::new();
        s.add_points(x, y);
        s
    }

    pub fn add_point(&mut self, x: f64, y: f64) {
        match self.points.binary_search_by(|p| p.0.partial_cmp(&x).unwrap()) {
            Ok(i) => self.points[i].1 = y, // TreeMap.put replaces
            Err(i) => self.points.insert(i, (x, y)),
        }
    }

    pub fn add_points(&mut self, x: &[f64], y: &[f64]) {
        assert_eq!(x.len(), y.len(), "Array lengths do not match");
        for i in 0..x.len() {
            self.add_point(x[i], y[i]);
        }
    }

    /// `LinearInterpolator.getValue(x)` — exact-key hit, clamp below first /
    /// above last, otherwise linear interpolation between bracketing keys.
    pub fn get_value(&self, x: f64) -> f64 {
        assert!(!self.points.is_empty(), "No points added yet to the interpolator.");
        if x.is_nan() {
            // Defensive: a NaN query (upstream divergence) clamps to the
            // first point rather than panicking the whole simulation.
            return self.points[0].1;
        }
        match self
            .points
            .binary_search_by(|p| p.0.partial_cmp(&x).unwrap_or(std::cmp::Ordering::Less))
        {
            Ok(i) => self.points[i].1,
            Err(i) => {
                if i == 0 {
                    // x < firstKey
                    self.points[0].1
                } else if i >= self.points.len() {
                    // x larger than all entries
                    self.points[self.points.len() - 1].1
                } else {
                    let (x1, y1) = self.points[i - 1];
                    let (x2, y2) = self.points[i];
                    (x - x1) / (x2 - x1) * (y2 - y1) + y1
                }
            }
        }
    }

    pub fn x_points(&self) -> Vec<f64> {
        self.points.iter().map(|p| p.0).collect()
    }
}

/// Port of `PolyInterpolator` (polynomial interpolation with value/derivative
/// constraints). Construction inverts the constraint matrix (O(n³)).
#[derive(Debug, Clone)]
pub struct PolyInterpolator {
    count: usize,
    interpolation_matrix: Vec<Vec<f64>>,
}

impl PolyInterpolator {
    /// `points[0]` = x's for function values, `points[1]` = x's for first
    /// derivatives, etc.
    pub fn new(points: &[&[f64]]) -> Self {
        let mut my_count = 0usize;
        for p in points {
            my_count += p.len();
        }
        assert!(my_count != 0, "No interpolation points defined.");
        let count = my_count;

        let mut mul = vec![1i64; count];
        let mut matrix = vec![vec![0.0f64; count]; count];
        let mut row = 0usize;
        for (j, pj) in points.iter().enumerate() {
            for i in 0..pj.len() {
                let mut x = 1.0f64;
                let mut col = count as i64 - 1 - j as i64;
                while col >= 0 {
                    let c = col as usize;
                    matrix[row][c] = x * mul[c] as f64;
                    x *= pj[i];
                    col -= 1;
                }
                row += 1;
            }
            for (i, m) in mul.iter_mut().enumerate() {
                *m *= count as i64 - i as i64 - j as i64 - 1;
            }
        }
        assert_eq!(row, count);

        Self {
            count,
            interpolation_matrix: inverse(matrix),
        }
    }

    pub fn interpolator(&self, values: &[f64]) -> Vec<f64> {
        assert_eq!(values.len(), self.count, "Wrong number of arguments");
        let mut ret = vec![0.0f64; self.count];
        for j in 0..self.count {
            for i in 0..self.count {
                ret[j] += self.interpolation_matrix[j][i] * values[i];
            }
        }
        ret
    }

    /// `PolyInterpolator.eval(x, coefficients)` — Horner, highest term first.
    pub fn eval(x: f64, coefficients: &[f64]) -> f64 {
        let mut v = 1.0f64;
        let mut result = 0.0f64;
        for i in (0..coefficients.len()).rev() {
            result += coefficients[i] * v;
            v *= x;
        }
        result
    }
}

fn inverse(mut matrix: Vec<Vec<f64>>) -> Vec<Vec<f64>> {
    let n = matrix.len();
    let mut x = vec![vec![0.0f64; n]; n];
    let mut b = vec![vec![0.0f64; n]; n];
    let mut index = vec![0usize; n];
    for i in 0..n {
        b[i][i] = 1.0;
    }
    gaussian(&mut matrix, &mut index);
    for i in 0..n.saturating_sub(1) {
        for j in (i + 1)..n {
            for k in 0..n {
                b[index[j]][k] -= matrix[index[j]][i] * b[index[i]][k];
            }
        }
    }
    for i in 0..n {
        x[n - 1][i] = b[index[n - 1]][i] / matrix[index[n - 1]][n - 1];
        for j in (0..n - 1).rev() {
            x[j][i] = b[index[j]][i];
            for k in (j + 1)..n {
                x[j][i] -= matrix[index[j]][k] * x[k][i];
            }
            x[j][i] /= matrix[index[j]][j];
        }
    }
    x
}

fn gaussian(a: &mut [Vec<f64>], index: &mut [usize]) {
    let n = index.len();
    let mut c = vec![0.0f64; n];
    for (i, idx) in index.iter_mut().enumerate() {
        *idx = i;
    }
    for i in 0..n {
        let mut c1 = 0.0;
        for j in 0..n {
            let c0 = a[i][j].abs();
            if c0 > c1 {
                c1 = c0;
            }
        }
        c[i] = c1;
    }
    let mut k = 0usize;
    for j in 0..n.saturating_sub(1) {
        let mut pi1 = 0.0;
        for i in j..n {
            let pi0 = a[index[i]][j].abs() / c[index[i]];
            if pi0 > pi1 {
                pi1 = pi0;
                k = i;
            }
        }
        index.swap(j, k);
        for i in (j + 1)..n {
            let pj = a[index[i]][j] / a[index[j]][j];
            a[index[i]][j] = pj;
            for l in (j + 1)..n {
                a[index[i]][l] -= pj * a[index[j]][l];
            }
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn linear_interp_clamps_and_interpolates() {
        let li = LinearInterpolator::with_points(&[0.0, 1.0, 2.0], &[0.0, 10.0, 30.0]);
        assert_eq!(li.get_value(-1.0), 0.0); // clamp low
        assert_eq!(li.get_value(0.0), 0.0); // exact
        assert_eq!(li.get_value(0.5), 5.0); // interp
        assert_eq!(li.get_value(1.5), 20.0);
        assert_eq!(li.get_value(3.0), 30.0); // clamp high
    }

    #[test]
    fn poly_interp_linear_through_two_values() {
        // value at x=0 is 1, value at x=1 is 2  => line y = x + 1
        let p = PolyInterpolator::new(&[&[0.0, 1.0]]);
        let coeff = p.interpolator(&[1.0, 2.0]);
        assert!((PolyInterpolator::eval(0.0, &coeff) - 1.0).abs() < 1e-9);
        assert!((PolyInterpolator::eval(1.0, &coeff) - 2.0).abs() < 1e-9);
        assert!((PolyInterpolator::eval(0.5, &coeff) - 1.5).abs() < 1e-9);
    }
}
