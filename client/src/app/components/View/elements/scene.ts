//@ Modules
import * as THREE from "three"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass"
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass"
import Stats from "stats.js"

//@ Helpers
import { loadTexture } from "./helpers/loader"
import { setupCamera } from "./helpers/camera"
import { setupControls } from "./helpers/controls"
import { setupLensflare } from "./helpers/lensflare"
import { animateScene } from "./helpers/animate"

//@ Objects
import { createEarth } from "./objects/earth"
import { createMoon } from "./objects/moon"
import { createSun } from "./objects/sun"

//@ Textures
import { createGlowTexture } from "./textures/glowTexture"
import { createGhostTexture } from "./textures/ghostTexture"

//@ Constants
import { initialState } from "./constants/initialStates"

export const Scene = (container: HTMLDivElement) => {
  const { width, height } = container.getBoundingClientRect()
  const scene = new THREE.Scene()

  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(width, height)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.VSMShadowMap
  container.appendChild(renderer.domElement)

  const starsTexture = loadTexture("/images/textures/High/8k_stars_milky_way.jpg", THREE.EquirectangularReflectionMapping)
  const dayTex = loadTexture("/images/textures/High/8k_earth_daymap.jpg")
  const nightTex = loadTexture("/images/textures/High/8k_earth_nightmap.jpg")
  const normalTex = loadTexture("/images/textures/High/8k_earth_normal_map.jpg")
  const specTex = loadTexture("/images/textures/High/8k_earth_specular_map.jpg")
  const cloudsTex = loadTexture("/images/textures/High/8k_earth_clouds.jpg")
  const moonTex = loadTexture("/images/textures/Medium/2k_moon.jpg")
  const sunTex = loadTexture("/images/textures/Medium/2k_sun.jpg")

  ;[dayTex, nightTex, moonTex, sunTex].forEach(t => t.colorSpace = THREE.SRGBColorSpace)

  scene.background = starsTexture

  const { sunMesh, sunLight } = createSun()
  scene.add(sunMesh, sunLight)
  scene.add(sunLight.target)

  const coreTex = createGlowTexture()
  const ghostTex = createGhostTexture()
  setupLensflare(sunLight, coreTex, ghostTex)

  scene.add(new THREE.AmbientLight(0xffffff, 0.05))

  const { earthPivot, earthGroup, earthMesh, cloudsMesh, earthMaterial, cloudsMaterial} =
    createEarth(dayTex, nightTex, normalTex, specTex, cloudsTex, initialState.earthRotationY)

  scene.add(earthPivot)

  const { moonPivot, moonMesh } = createMoon(moonTex)
  scene.add(moonPivot)

  const { camera, worldEarthPos } = setupCamera(initialState, earthGroup, width, height)
  const controls = setupControls(camera, worldEarthPos, renderer.domElement)

  const composer = new EffectComposer(renderer)
  composer.addPass(new RenderPass(scene, camera))
  composer.addPass(new UnrealBloomPass(new THREE.Vector2(width, height), 0.2, 0.4, 0.85))
  composer.addPass(new OutputPass())

	const stats = new Stats()
  stats.showPanel(0)
  stats.dom.style.position = 'absolute'
  stats.dom.style.top = '0px'
  stats.dom.style.left = '0px'
  container.appendChild(stats.dom)

  animateScene({ scene, earthPivot, earthMesh, cloudsMesh, earthMaterial, cloudsMaterial, moonPivot, moonMesh, sunMesh, sunLight, camera, controls, composer, stats })

  const handleResize = () => {
    const { width: w, height: h } = container.getBoundingClientRect()
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    renderer.setSize(w, h)
    composer.setSize(w, h)
  }

  window.addEventListener("resize", handleResize)

  return () => {
    window.removeEventListener("resize", handleResize)
    renderer.dispose()
    if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
  }
}

export default Scene