//@ Modules
import * as THREE from "three"

//@ Materials
import { createEarthMaterial } from "../materials/earthMaterial"
import { createCloudsMaterial } from "../materials/cloudsMaterial"

export const createEarth = (
  dayTex: THREE.Texture,
  nightTex: THREE.Texture,
  normalTex: THREE.Texture,
  specTex: THREE.Texture,
  cloudsTex: THREE.Texture,
  initialRotationY: number,
  pivotPositionX = 3840
) => {
  const earthPivot = new THREE.Object3D()
  const earthGroup = new THREE.Group()
  earthGroup.position.x = pivotPositionX
  earthPivot.add(earthGroup)

  const earthMaterial = createEarthMaterial(dayTex, nightTex, normalTex, specTex)
  const earthMesh = new THREE.Mesh(new THREE.SphereGeometry(10, 64, 64), earthMaterial)
  earthMesh.rotation.y = initialRotationY
  earthMesh.castShadow = true
  earthMesh.receiveShadow = true
  earthGroup.add(earthMesh)

  const cloudsMaterial = createCloudsMaterial(cloudsTex)
  const cloudsMesh = new THREE.Mesh(new THREE.SphereGeometry(10.02, 64, 64), cloudsMaterial)
  cloudsMesh.castShadow = true
  cloudsMesh.receiveShadow = true
  earthGroup.add(cloudsMesh)

	const ozoneGeometry = new THREE.SphereGeometry(10.1, 64, 64)
  const ozoneMaterial = new THREE.MeshPhongMaterial({
    color: 0x00aaff,
    transparent: true,
    opacity: 0.05,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
  })
  const ozoneMesh = new THREE.Mesh(ozoneGeometry, ozoneMaterial)
  earthGroup.add(ozoneMesh)

  return { earthPivot, earthGroup, earthMesh, cloudsMesh, earthMaterial, cloudsMaterial }
}