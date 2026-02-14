//@ Modules
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

//C: Camera frustum configuration
const FOV = 75
const NEAR = 0.1
const FAR = 2500000

//C: Initial viewing angle and distance in degrees/units
const START_DEG_LEFT = -125
const START_DEG_UP = 20
const START_DISTANCE = 15

//C: User interaction constraints
const MIN_ZOOM = 5.65
const MAX_ZOOM = 30
const DAMPING_FACTOR = 0.05

const createCamera = (w: number, h: number, container: HTMLElement) => {
  const camera = new THREE.PerspectiveCamera(FOV, w / h, NEAR, FAR)
  const controls = new OrbitControls(camera, container)

  //C: Convert spherical angles to Cartesian coordinates for initial placement
  const phi = (90 - START_DEG_UP) * (Math.PI / 180)
  const theta = START_DEG_LEFT * (Math.PI / 180)
  const relPos = new THREE.Vector3().setFromSphericalCoords(START_DISTANCE, phi, theta)

  //C: Configure smooth interaction behavior
  controls.enableDamping = true
  controls.dampingFactor = DAMPING_FACTOR
  controls.minDistance = MIN_ZOOM
  controls.maxDistance = MAX_ZOOM

  //C: Sync camera position with Earth's orbital movement
  const updateCamera = (earthPosition: THREE.Vector3, oldEarthPosition: THREE.Vector3) => {
    camera.position.x += (earthPosition.x - oldEarthPosition.x)
    camera.position.z += (earthPosition.z - oldEarthPosition.z)

    controls.target.copy(earthPosition)
    controls.update()
  }

  //C: Set initial focus and relative offset from Earth
  const initPosition = (earthPosition: THREE.Vector3) => {
    camera.position.copy(earthPosition).add(relPos)
    controls.target.copy(earthPosition)
    controls.update()
  }

  return { camera, controls, updateCamera, initPosition }
}

export { createCamera }