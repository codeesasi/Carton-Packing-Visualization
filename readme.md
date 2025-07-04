# 3D Packing & Carton Visualization

This project provides interactive 3D visualizations for:
- Industrial pallets (block type, 42"x42")
- Carton boxes (bottom lock, with open flaps)
- Packing layouts with containers and items

## Features

- **Viewer:** Visualizes containers and items from `layout.json` in 3D (`Viewer.html`)
- **Pallet:** Shows a standard 42"x42" block pallet in 3D (`pallet.html`)
- **Carton:** Shows a bottom lock carton box with open top flaps (`cartons.html`)
- **Legend:** Color-coded items with a legend for easy identification
- **Interactive:** Orbit, zoom, and pan with mouse controls

## Usage

1. Open any HTML file (`Viewer.html`, `pallet.html`, `cartons.html`) in a modern web browser.
2. For `Viewer.html`, edit `layout.json` to define containers and items.
3. Use mouse to rotate, zoom, and pan the 3D scene.

## File Overview

- `Viewer.html` — Main 3D packing viewer, reads `layout.json`
- `pallet.html` — 3D visualization of a standard block pallet (42"x42")
- `cartons.html` — 3D visualization of a bottom lock carton with open flaps
- `layout.json` — Data file for containers and items (used by `Viewer.html`)

## Requirements

- No installation needed. All dependencies are loaded via CDN.
- Works in any modern browser with WebGL support.

## Customization

- **layout.json:**  
  - Add multiple containers and items.  
  - Assign items to containers using the `boxId` property.

- **Colors:**  
  - Item colors can be set in `layout.json` or will use a default palette.

## Credits

- [three.js](https://threejs.org/) for 3D rendering

---

*Created for industrial packaging and visualization needs.*
