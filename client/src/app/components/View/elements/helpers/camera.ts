//@ Modules
import * as THREE from "three"

export const setupCamera = (initialState: any, earthGroup: THREE.Group, width: number, height: number) => {
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 15000)

  const worldEarthPos = new THREE.Vector3()
  earthGroup.getWorldPosition(worldEarthPos)

  const camOffset = new THREE.Vector3()
  camOffset.setFromSphericalCoords(
    initialState.cameraDistance,
    Math.PI / 2 - initialState.cameraPhi,
    initialState.cameraTheta
  )
  camera.position.copy(worldEarthPos).add(camOffset)

  return { camera, worldEarthPos, camOffset }
}