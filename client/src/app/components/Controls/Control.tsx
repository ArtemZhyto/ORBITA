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
		<div className="Control flex justify-center w-[350px] h-screen bg-green-800">
			<div className="my-[15px] flex flex-col">
				<p className="text-[28px] mb-[5px]">Section1</p>
				<div className="flex flex-col ml-[20px] text-[22px]">
					<button className="w-[100px] bg-red-600">setting1</button>
					<button className="w-[100px] bg-red-600">setting2</button>
					<button className="w-[100px] bg-red-600">setting3</button>
					<button className="w-[100px] bg-red-600">setting4</button>
					<button className="w-[100px] bg-red-600">setting5</button>
				</div>
			</div>
		</div>
	)
}

export default Control