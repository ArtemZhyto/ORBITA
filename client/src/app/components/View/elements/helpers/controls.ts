//@ Modules
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

export const setupControls = (camera: THREE.Camera, target: THREE.Vector3, domElement: HTMLElement) => {
  const controls = new OrbitControls(camera, domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  controls.minDistance = 12
  controls.maxDistance = 75
  controls.target.copy(target)
  controls.update()
  return controls
}