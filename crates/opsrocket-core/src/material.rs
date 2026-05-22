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

    /// Look up a standard material by name (case-insensitive). Returns the
    /// catalog entry (with kind + density) if it matches OpenRocket's library.
    pub fn lookup(name: &str) -> Option<&'static CatalogEntry> {
        let lower = name.to_lowercase();
        CATALOG
            .iter()
            .find(|e| e.name.to_lowercase() == lower)
    }
}

/// One entry in the bundled materials catalog. `name` matches OpenRocket's
/// canonical label so loading a .ork with `<material>Cardboard</material>`
/// resolves to the same density.
#[derive(Debug, Clone, Copy)]
pub struct CatalogEntry {
    pub name: &'static str,
    pub kind: MaterialType,
    /// Density in SI units appropriate for `kind` (kg/m³ / kg/m² / kg/m).
    pub density: f64,
    pub group: &'static str,
}

impl CatalogEntry {
    pub fn into_material(self) -> Material {
        Material {
            name: self.name.to_string(),
            kind: self.kind,
            density: self.density,
            group: Some(self.group.to_string()),
        }
    }
}

/// Standard materials library — Bulk (kg/m³), Surface (kg/m²), Line (kg/m).
/// Mirrors OpenRocket's `core/resources/datafiles/materials/` catalog so any
/// .ork that names "Cardboard" / "Balsa" / "Ripstop nylon" resolves to the
/// same density without having to embed densities in every .ork.
pub const CATALOG: &[CatalogEntry] = &[
    // -- Bulk: woods --------------------------------------------------------
    CatalogEntry { name: "Balsa", kind: MaterialType::Bulk, density: 170.0, group: "wood" },
    CatalogEntry { name: "Basswood", kind: MaterialType::Bulk, density: 500.0, group: "wood" },
    CatalogEntry { name: "Birch", kind: MaterialType::Bulk, density: 670.0, group: "wood" },
    CatalogEntry { name: "Maple", kind: MaterialType::Bulk, density: 755.0, group: "wood" },
    CatalogEntry { name: "Pine", kind: MaterialType::Bulk, density: 530.0, group: "wood" },
    CatalogEntry { name: "Plywood (birch)", kind: MaterialType::Bulk, density: 630.0, group: "wood" },
    CatalogEntry { name: "Spruce", kind: MaterialType::Bulk, density: 450.0, group: "wood" },
    // -- Bulk: paper / card -------------------------------------------------
    CatalogEntry { name: "Cardboard", kind: MaterialType::Bulk, density: 680.0, group: "paper" },
    CatalogEntry { name: "Paper (office)", kind: MaterialType::Bulk, density: 1200.0, group: "paper" },
    // -- Bulk: plastics -----------------------------------------------------
    CatalogEntry { name: "ABS", kind: MaterialType::Bulk, density: 1050.0, group: "plastic" },
    CatalogEntry { name: "Acrylic (Plexiglass)", kind: MaterialType::Bulk, density: 1190.0, group: "plastic" },
    CatalogEntry { name: "Delrin", kind: MaterialType::Bulk, density: 1420.0, group: "plastic" },
    CatalogEntry { name: "Nylon", kind: MaterialType::Bulk, density: 1140.0, group: "plastic" },
    CatalogEntry { name: "Polycarbonate (Lexan)", kind: MaterialType::Bulk, density: 1200.0, group: "plastic" },
    CatalogEntry { name: "Polyethylene LDPE", kind: MaterialType::Bulk, density: 920.0, group: "plastic" },
    CatalogEntry { name: "Polyethylene HDPE", kind: MaterialType::Bulk, density: 950.0, group: "plastic" },
    CatalogEntry { name: "Polypropylene", kind: MaterialType::Bulk, density: 905.0, group: "plastic" },
    CatalogEntry { name: "Polystyrene", kind: MaterialType::Bulk, density: 1050.0, group: "plastic" },
    CatalogEntry { name: "PVC", kind: MaterialType::Bulk, density: 1390.0, group: "plastic" },
    CatalogEntry { name: "PLA (3D-print)", kind: MaterialType::Bulk, density: 1240.0, group: "plastic" },
    CatalogEntry { name: "PETG (3D-print)", kind: MaterialType::Bulk, density: 1270.0, group: "plastic" },
    // -- Bulk: composites ---------------------------------------------------
    CatalogEntry { name: "Carbon fiber", kind: MaterialType::Bulk, density: 1780.0, group: "composite" },
    CatalogEntry { name: "Epoxy", kind: MaterialType::Bulk, density: 1200.0, group: "composite" },
    CatalogEntry { name: "Fiberglass", kind: MaterialType::Bulk, density: 1850.0, group: "composite" },
    CatalogEntry { name: "G10 fiberglass", kind: MaterialType::Bulk, density: 1900.0, group: "composite" },
    CatalogEntry { name: "Kevlar", kind: MaterialType::Bulk, density: 1440.0, group: "composite" },
    // -- Bulk: metals -------------------------------------------------------
    CatalogEntry { name: "Aluminum", kind: MaterialType::Bulk, density: 2700.0, group: "metal" },
    CatalogEntry { name: "Brass", kind: MaterialType::Bulk, density: 8550.0, group: "metal" },
    CatalogEntry { name: "Copper", kind: MaterialType::Bulk, density: 8930.0, group: "metal" },
    CatalogEntry { name: "Lead", kind: MaterialType::Bulk, density: 11340.0, group: "metal" },
    CatalogEntry { name: "Steel", kind: MaterialType::Bulk, density: 7850.0, group: "metal" },
    CatalogEntry { name: "Titanium", kind: MaterialType::Bulk, density: 4500.0, group: "metal" },
    // -- Surface (kg/m²) ----------------------------------------------------
    CatalogEntry { name: "Cellophane (thin)", kind: MaterialType::Surface, density: 0.020, group: "film" },
    CatalogEntry { name: "Mylar", kind: MaterialType::Surface, density: 0.021, group: "film" },
    CatalogEntry { name: "Polyethylene (thin)", kind: MaterialType::Surface, density: 0.020, group: "film" },
    CatalogEntry { name: "Polyethylene (thick)", kind: MaterialType::Surface, density: 0.067, group: "film" },
    CatalogEntry { name: "Ripstop nylon", kind: MaterialType::Surface, density: 0.067, group: "fabric" },
    CatalogEntry { name: "Ripstop nylon (heavy)", kind: MaterialType::Surface, density: 0.105, group: "fabric" },
    CatalogEntry { name: "Paper, slick", kind: MaterialType::Surface, density: 0.110, group: "paper" },
    CatalogEntry { name: "Paper, hard", kind: MaterialType::Surface, density: 0.225, group: "paper" },
    // -- Line (kg/m) --------------------------------------------------------
    CatalogEntry { name: "Elastic cord (round, 2 mm)", kind: MaterialType::Line, density: 0.0029, group: "elastic" },
    CatalogEntry { name: "Elastic cord (flat, 6.4 mm)", kind: MaterialType::Line, density: 0.0117, group: "elastic" },
    CatalogEntry { name: "Braided nylon (1.85 mm)", kind: MaterialType::Line, density: 0.0029, group: "cord" },
    CatalogEntry { name: "Braided nylon (3.2 mm)", kind: MaterialType::Line, density: 0.0083, group: "cord" },
    CatalogEntry { name: "Kevlar string (1.6 mm)", kind: MaterialType::Line, density: 0.0028, group: "cord" },
    CatalogEntry { name: "Tubular nylon (12.7 mm)", kind: MaterialType::Line, density: 0.0186, group: "webbing" },
];
