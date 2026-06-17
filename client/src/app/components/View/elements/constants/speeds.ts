//! MIN
//! 0.00001 - 1x
//! 0.00005 - 5x
//! 0.0001 - 10x
//! 0.0005 - 50x --- DEFAULT
//! 0.001 - 100x
//! 0.005 - 500x
//! 0.01 - 1 000x
//! 0.05 - 5 000x
//! MAX

const DAY_UNIT = 0.0005
const moonOrbitSpeed =  DAY_UNIT / 27.3

export const speeds = {
  earthOrbit: DAY_UNIT / 365.25,
  earthRotation: DAY_UNIT,
  cloudsRotation: DAY_UNIT * 1.05,
  moonOrbit: moonOrbitSpeed,
  moonRotation: DAY_UNIT / 27.3,
	moonPrecessionSpeed: moonOrbitSpeed * 0.0001
}