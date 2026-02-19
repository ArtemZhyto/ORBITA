# ORBITA (Orbital Radio-coverage Behavior & Interaction Analysis) 🛰️

> **Status:** Active Development / Architectural Modeling Phase  
> **Tech Stack:** Next.js, TypeScript, Three.js (WebGL), GLSL

<div align="center">
  <video src="./assets/preview.mp4" width="100%" autoplay loop muted playsinline></video>
  <p align="center">
    <strong>ORBITA Engine:</strong> Real-time day/night transition and atmospheric scattering simulation.
  </p>
</div>

ORBITA is an analytical system designed for modeling satellite constellation behaviors and visualizing radio-coverage interaction. The project bridges the gap between complex orbital mechanics and high-performance web-based simulation.

## Project Essence 🎯

The core of ORBITA is a simulation environment where users can configure satellite constellations and analyze their dynamics. The system provides:

* **Dynamic Modeling:** Real-time simulation based on user-defined satellite parameters.
* **Visual Analysis:** High-fidelity 3D representation of orbital paths and coverage footprints.
* **Data Export:** Generation and export of precise coordinate datasets in **JSON** and **CSV** formats for mission-planning integration.

## Technical Excellence & Implementation 🛠️

Beyond standard 3D rendering, ORBITA implements advanced engineering solutions directly in the graphics pipeline:

* **Custom Shader Engineering:** Leverages `onBeforeCompile` to inject custom GLSL code into Three.js materials. This enables real-time dynamic day/night transitions by calculating the **dot product** between world normals and the sun's position vector.
* **Atmospheric Scattering Emulation:** A multi-layered sphere architecture using specialized blending modes (`AdditiveBlending`) and back-face rendering to simulate planetary ozone and atmospheric glow.
* **Precision Camera Tracking:** Implements a delta-tracking algorithm (`delta.subVectors`) for the camera system, ensuring fluid motion and preventing jitter during large-scale coordinate transformations.
* **Vector-Based Lighting:** Dynamic light direction updates for shaders, ensuring consistent shadowing across the Earth, Moon, and cloud layers.

## Mathematical Foundation 🧮

The project is built on rigorous mathematical reasoning:
* **Multivariable Calculus:** Applied for system modeling and calculating interaction points in 3D space.
* **Spherical Trigonometry:** Used for precise mapping of coverage area on the planetary surface.
* **Vector Analysis:** Powering the core engine for predictable and accurate satellite positioning and light-source calculations.

## Key Features ⚙️

* **Interactive Control Panel:** Real-time configuration of constellation density and orbital parameters.
* **Analytical Data Engine:** Automated calculation of coordinates and orbital trajectories.
* **Post-Processing Pipeline:** Integrated `EffectComposer` with `UnrealBloomPass` and specialized lens flare systems to simulate high-dynamic-range (HDR) solar radiation.
* **Performance-First Rendering:** Optimized visualization logic designed for 60 FPS under varying constellation loads, monitored via real-time telemetry (Stats.js).

## Development Philosophy 💡

Like all my projects, ORBITA follows strict engineering principles:
* **Clarity:** Explicit data contracts for orbital parameters.
* **Determinism:** Consistent simulation results across different hardware.
* **Maintainability:** A modular, typed codebase (TypeScript) allowing for future expansion into more complex physics models.

---

*This project is part of a long-term direction toward aerospace-related technology and advanced engineering systems.*

[![Support Development](https://img.shields.io/badge/🚀_Support_Development-Monobank-%2300B2FF?style=for-the-badge&logo=monobank)](https://send.monobank.ua/jar/8HQAch1y6E)
