//@ Modules
import * as THREE from "three"

//@ Textures
import { createGlowTexture } from "../textures/glowTexture"
import { createGhostTexture } from "../textures/ghostTexture"

export const createSun = () => {
  const sunMesh = new THREE.Mesh(
    new THREE.SphereGeometry(15, 2, 2),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
  )

  const sunLight = new THREE.DirectionalLight(0xffffff, 5.0)
  sunLight.castShadow = true
  sunLight.shadow.mapSize.set(2048, 2048)
  sunLight.shadow.bias = -0.0005
  sunLight.shadow.radius = 10

  const d = 30
  const shadowCam = sunLight.shadow.camera as THREE.OrthographicCamera
  shadowCam.left = -d
	shadowCam.right = d
	shadowCam.top = d
	shadowCam.bottom = -d
  shadowCam.near = 0.1
	shadowCam.far = 10000

  const glareGroup = new THREE.Group()
  sunMesh.add(glareGroup)

  const coreTex = createGlowTexture(false)
  const streakTex = createGlowTexture(true)
  const verticalTex = createGlowTexture(true)
  const ghostTex = createGhostTexture()

  const coreGlare = new THREE.Sprite(new THREE.SpriteMaterial({ map: coreTex, blending: THREE.AdditiveBlending, depthWrite: false }))
  coreGlare.scale.set(800, 800, 1)
  glareGroup.add(coreGlare)

  const streak = new THREE.Sprite(new THREE.SpriteMaterial({ map: streakTex, blending: THREE.AdditiveBlending, transparent: true, opacity: 0.6, depthWrite: false }))
  streak.scale.set(2000, 150, 1)
  glareGroup.add(streak)

  const vertical = new THREE.Sprite(new THREE.SpriteMaterial({ map: verticalTex, blending: THREE.AdditiveBlending, transparent: true, opacity: 0.6, depthWrite: false }))
  vertical.scale.set(150, 2500, 1)
  glareGroup.add(vertical)

  const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: coreTex, color: 0xffccaa, blending: THREE.AdditiveBlending, transparent: true, opacity: 0.2, depthWrite: false }))
  halo.scale.set(3500, 3500, 1)
  glareGroup.add(halo)

  return { sunMesh, sunLight, coreTex, ghostTex }
}