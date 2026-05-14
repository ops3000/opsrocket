//! Material descriptions.
//!
//! Ported from `info.openrocket.core.material.Material`.

use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum MaterialType {
    /// 3-D bulk material, density in kg/m³.
    Bulk,
    /// 2-D surface material, density in kg/m².
    Surface,
    /// 1-D line material, density in kg/m.
    Line,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct Material {
    pub name: String,
    pub kind: MaterialType,
    /// Density in SI units appropriate for `kind`.
    pub density: f64,
    pub group: Option<String>,
}

impl Material {
    pub fn bulk(name: impl Into<String>, density: f64) -> Self {
        Self { name: name.into(), kind: MaterialType::Bulk, density, group: None }
    }

    pub fn surface(name: impl Into<String>, density: f64) -> Self {
        Self { name: name.into(), kind: MaterialType::Surface, density, group: None }
    }

    pub fn line(name: impl Into<String>, density: f64) -> Self {
        Self { name: name.into(), kind: MaterialType::Line, density, group: None }
    }
}
