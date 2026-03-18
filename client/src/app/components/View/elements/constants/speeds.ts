const DAY_UNIT = 0.0001
const moonOrbitSpeed =  DAY_UNIT / 27.3

export const speeds = {
  earthOrbit: DAY_UNIT / 365.25,
  earthRotation: DAY_UNIT,
  cloudsRotation: DAY_UNIT * 1.05,
  moonOrbit: moonOrbitSpeed,
  moonRotation: DAY_UNIT / 27.3,
	moonPrecessionSpeed: moonOrbitSpeed * 0.0001
}