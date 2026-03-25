"use client"

//@ Styles
import "./Control.scss"

/**
 * ============================================================================
 * ORBITA | RESEARCH CONTROL PANEL ARCHITECTURE
 * ============================================================================
 *
 * * 1. CONSTELLATION CONFIGURATION (Geometry & Topology)
 * ----------------------------------------------------------------------------
 * - Satellite Count (N): [Range 24 - 500]. Primary research variable for
 * global coverage density analysis.
 *
 * - Orbital Planes (P): [From 3] Number of distinct orbital rings. Determines the
 * Walker Delta constellation symmetry.
 *
 * - Inclination (i): Orbital tilt relative to the equator [0° - 90°].
 * Critical for polar vs. equatorial coverage optimization.
 *
 * - Phase Offset (f): Displacement between satellites in adjacent planes
 * to minimize service gaps (phasing).
 *
 *
 * * 2. COVERAGE PHYSICS (Signal & Aperture)
 * ----------------------------------------------------------------------------
 * - Orbital Altitude (h): [Range 300 - 2000] Distance from Earth's surface (km). Affects
 * the footprint radius and latency.
 *
 * - Beam Half-Angle (theta): Satellite antenna aperture. Defines the
 * spherical cap area of the signal.
 *
 * - Min. Elevation Angle: Minimum horizon angle for ground-to-satellite
 * visibility (Link Budget threshold).
 *
 *
 *  * 3. LIVE ANALYTICS (Research Metrics)
 * ----------------------------------------------------------------------------
 * - Global Coverage %: Real-time calculation of total Earth surface
 * area serviced.
 *
 * - Redundancy Level: Average number of satellites visible from a
 * single ground point (N-redundancy).
 *
 * - Ground Station Tracking: Latency and uptime monitoring for
 * key locations (New York, London, Tokyo, Kyiv).
 *
 *
 * * 4. SYSTEM UTILITIES (Data Acquisition)
 * ----------------------------------------------------------------------------
 * - Research Export: JSON/CSV telemetry output for external
 * mathematical verification (MATLAB/STK compatible).
 *
 *  - Heatmap Analysis: GPU-accelerated visualization of signal intensity.
 * ============================================================================
 */

const Control = () => {
	return (
		<div className="Control flex justify-center w-[350px] h-screen bg-[#101117]">
			<div className="my-[20px] mx-[15px] flex flex-col">
				<p className="text-[24px] mb-[15px]">Constellation configuration</p>
				<div className="w-full flex flex-col items-center text-[22px] gap-[20px]">
					<button className="max-w-[150px] w-full bg-[--block] rounded-[12.5px] px-[35px]">setting1</button>
					<button className="max-w-[150px] w-full bg-[--block] rounded-[12.5px] px-[35px]">setting2</button>
					<button className="max-w-[150px] w-full bg-[--block] rounded-[12.5px] px-[35px]">setting3</button>
					<button className="max-w-[150px] w-full bg-[--block] rounded-[12.5px] px-[35px]">setting4</button>
					<button className="max-w-[150px] w-full bg-[--block] rounded-[12.5px] px-[35px]">setting5</button>
				</div>
			</div>
		</div>
	)
}

export default Control