//@ Modules
import * as THREE from "three"

export const createMoon = (moonTex: THREE.Texture, positionX = 480) => {
  const moonPivot = new THREE.Object3D()
  const moonMesh = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({ map: moonTex })
  )

  moonMesh.position.x = positionX
  moonMesh.castShadow = true
  moonMesh.receiveShadow = true
  moonPivot.add(moonMesh)

  return { moonPivot, moonMesh }
}