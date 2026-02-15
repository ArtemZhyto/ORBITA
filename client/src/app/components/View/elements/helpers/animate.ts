//@ Modules
import * as THREE from "three"

//@ Constants
import { speeds } from "../constants/speeds"

export const animateScene = (params: {
  scene: THREE.Scene
  earthPivot: THREE.Object3D
  earthMesh: THREE.Mesh
  cloudsMesh: THREE.Mesh
  earthMaterial: any
  cloudsMaterial: any
  moonPivot: THREE.Object3D
  moonMesh: THREE.Mesh
  sunMesh: THREE.Mesh
  sunLight: THREE.DirectionalLight
  camera: THREE.Camera
  controls: any
  composer: any
	stats: any
}) => {
  const { earthPivot, earthMesh, cloudsMesh, earthMaterial, cloudsMaterial, moonPivot, moonMesh, sunMesh, sunLight, camera, controls, composer, scene, stats } = params

  const lastEarthPos = new THREE.Vector3()
  const currentEarthPos = new THREE.Vector3()
  const sunWorldPosition = new THREE.Vector3()
  const delta = new THREE.Vector3()
  let reqId = 0

  earthMesh.parent!.getWorldPosition(lastEarthPos)

  const animate = () => {
		stats.begin()
    reqId = requestAnimationFrame(animate)

    earthPivot.rotation.y += speeds.earthOrbit
    earthMesh.rotation.y += speeds.earthRotation
    cloudsMesh.rotation.y += speeds.cloudsRotation
    cloudsMesh.rotation.z += speeds.cloudsRotation
    cloudsMesh.rotation.x -= speeds.cloudsRotation
    moonPivot.rotation.y += speeds.moonOrbit
    moonMesh.rotation.y += speeds.moonRotation

    scene.updateMatrixWorld()
    earthMesh.parent!.getWorldPosition(currentEarthPos)
    sunMesh.getWorldPosition(sunWorldPosition)
    moonPivot.position.copy(currentEarthPos)

    sunLight.position.copy(sunWorldPosition)
    sunLight.target.position.copy(currentEarthPos)
    sunLight.target.updateMatrixWorld()

    delta.subVectors(currentEarthPos, lastEarthPos)
    camera.position.add(delta)

    const lightDir = new THREE.Vector3().subVectors(sunWorldPosition, currentEarthPos).normalize()
    if (earthMaterial.userData.shader) earthMaterial.userData.shader.uniforms.lightDirection.value.copy(lightDir)
    if (cloudsMaterial.userData.shader) cloudsMaterial.userData.shader.uniforms.lightDirection.value.copy(lightDir)

    controls.target.copy(currentEarthPos)
    lastEarthPos.copy(currentEarthPos)

    controls.update()
    composer.render()
		stats.end()
  }

  animate()

  return () => cancelAnimationFrame(reqId)
}