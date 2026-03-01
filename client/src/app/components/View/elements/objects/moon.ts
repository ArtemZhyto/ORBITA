//@ Modules
import * as THREE from "three"

//@ Constants
import { initialDistances } from "../constants/distances"

export const createMoon = (moonTex: THREE.Texture) => {
  const moonPivot = new THREE.Object3D()
  const moonMesh = new THREE.Mesh(
    new THREE.SphereGeometry(3, 12, 12),
    new THREE.MeshStandardMaterial({ map: moonTex })
  )

  moonMesh.position.x = initialDistances.moonFromEarth
  moonMesh.castShadow = true
  moonMesh.receiveShadow = true
  moonPivot.add(moonMesh)

  return { moonPivot, moonMesh }
}