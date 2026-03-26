"use client"

//@ Modules
import { useState } from "react"

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
	const [range, setRange] = useState(10)
	const [value, setValue] = useState(10)

	return (
		<div className="Control flex justify-center w-[350px] h-screen bg-[#101117]">
			<div className="my-[20px] mx-[15px] flex flex-col">
				<p className="text-[24px] mb-[15px]">Constellation configuration</p>

				<div className="w-full flex flex-col items-center text-[22px] gap-[20px]">
					{/* <button className="max-w-[200px] w-full bg-[--block] rounded-[12.5px] px-[35px]">setting</button> */}

					<div className="max-w-[200px] w-full">
						<div className="text-center">Range: {range}</div>

						<input type="range"
									 min="0"
									 max="100"
									 step="1"
									 value={range}
									 onChange={(e) => setRange(Number(e.target.value))}
									 className="w-full h-[6px] appearance-none rounded-[100px] bg-[#b5b8bd] cursor-pointer"/>
					</div>

					<div className="max-w-[200px] w-full">
						<div className="text-center">Some value</div>

						<input type="text"
									 inputMode="numeric"
									 pattern="[0-9]*"
									 value={value}
									 onChange={(e) => {
										 let val = e.target.value.replace(/\D/g, "")

										 if (val === "") {
											 setValue(0)
											 return
										 }

										 let num = Math.min(100, Math.max(0, Number(val)))
										 setValue(num)
									 }}
									 onBlur={() => {
										 if (String(value) === '') setValue(0)
									 }}
									 className="max-w-[200px] w-full h-[35px] mt-[15px] appearance-none px-[15px] rounded-[12.5px] bg-[--block]"/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Control