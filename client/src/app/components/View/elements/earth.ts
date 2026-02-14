//@ Modules
import * as THREE from "three"

//@ Components
import { createEarthMesh } from "./mesh/earth/earth-mesh"

//C: Physical constants for Earth's orbital and rotational mechanics
const EARTH_ORBIT_RADIUS = 100000
const EARTH_ORBIT_SPEED = 0.00001
const ROTATION_SPEED = 0.00001
const AXIAL_TILT_DEG = 23.5
const AXIAL_TILT_RAD = AXIAL_TILT_DEG * (Math.PI / 180)

//C: Starting rotation to face Europe upon load
const START_ROTATION_Y = 4.3

const Earth = (manager: THREE.LoadingManager) => {
  //C: Define the vertical axis for rotation
  const earthAxis = new THREE.Vector3(0, 1, 0)
  let orbitAngle = 0

  const earth = createEarthMesh(manager)

  //C: Apply physical axial tilt
  earth.rotation.z = AXIAL_TILT_RAD

  //C: Apply initial longitude orientation
  earth.rotation.y = START_ROTATION_Y

  //C: Initialize starting orbital position
  earth.position.x = Math.cos(orbitAngle) * EARTH_ORBIT_RADIUS
  earth.position.z = Math.sin(orbitAngle) * EARTH_ORBIT_RADIUS

  earth.userData = {
    //C: Frame-by-frame transformation logic
    update: () => {
      //C: Spin Earth around its tilted axis
      earth.rotateOnAxis(earthAxis, ROTATION_SPEED)

      //C: Calculate and set new position on the orbital path
      orbitAngle += EARTH_ORBIT_SPEED
      earth.position.x = Math.cos(orbitAngle) * EARTH_ORBIT_RADIUS
      earth.position.z = Math.sin(orbitAngle) * EARTH_ORBIT_RADIUS
    },

    //C: Pass Sun coordinates to the shader for day/night transition
    updateSunPosition: (sunPos: THREE.Vector3) => {
      if (earth.material instanceof THREE.ShaderMaterial) {
        earth.material.uniforms.sunPosition.value.copy(sunPos)
      }
    }
  }

  return earth
}

export default Earth