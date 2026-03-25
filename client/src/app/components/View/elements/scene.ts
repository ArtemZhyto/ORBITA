//@ Modules
import * as THREE from "three"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass"
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass"
import Stats from "stats.js"

//@ Helpers
import { startProgressiveLoading } from "./helpers/loader"
import { setupCamera } from "./helpers/camera"
import { setupControls } from "./helpers/controls"
import { setupLensflare } from "./helpers/lensflare"
import { animateScene } from "./helpers/animate"
import * as Textures from "./helpers/textures"

//@ Objects
import { createEarth } from "./objects/earth"
import { createMoon } from "./objects/moon"
import { createSun } from "./objects/sun"

//@ Textures
import { createGlowTexture } from "./textures/glowTexture"
import { createGhostTexture } from "./textures/ghostTexture"

const yieldToMain = () => new Promise(resolve => setTimeout(resolve, 0))

export const Scene = async (
  container: HTMLDivElement,
  onProgress: (p: number) => void,
  onLoaded: () => void
) => {
  const { width, height } = container.getBoundingClientRect()
  const scene = new THREE.Scene()
  scene.background = Textures.starsTexture

  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.VSMShadowMap
  container.appendChild(renderer.domElement)

  await yieldToMain()

  const { sunMesh, sunLight } = createSun()
  scene.add(sunMesh, sunLight)

  const coreTex = createGlowTexture()
  const ghostTex = createGhostTexture()
  setupLensflare(sunLight, coreTex, ghostTex)

  scene.add(new THREE.AmbientLight(0xffffff, 0.05))

  await yieldToMain()

  const { earthPivot, earthGroup, earthMesh, cloudsMesh, earthMaterial, cloudsMaterial } =
    createEarth(Textures.dayTex, Textures.nightTex, Textures.normalTex, Textures.specTex, Textures.cloudsTex)
  scene.add(earthPivot)

  await yieldToMain()

  const { moonPivot, moonMesh } = createMoon(Textures.moonTex)
  scene.add(moonPivot)

  const { camera, worldEarthPos } = setupCamera(earthGroup, width, height)
  const controls = setupControls(camera, worldEarthPos, renderer.domElement)

  const composer = new EffectComposer(renderer)
  composer.addPass(new RenderPass(scene, camera))

  const bloomPass = new UnrealBloomPass(new THREE.Vector2(width, height), 0.2, 0.4, 0.85)
  composer.addPass(bloomPass)
  composer.addPass(new OutputPass())

  await renderer.compileAsync(scene, camera)

  const stats = new Stats()
  stats.dom.style.zIndex = '0'
  container.appendChild(stats.dom)

  const cleanupAnimate = animateScene({
    scene, earthPivot, earthMesh, cloudsMesh, earthMaterial,
    cloudsMaterial, moonPivot, moonMesh, sunMesh, sunLight,
    camera, controls, composer, stats
  })

  startProgressiveLoading(onProgress, onLoaded)

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
    cleanupAnimate()
    renderer.dispose()
    earthMaterial.dispose()
    cloudsMaterial.dispose()
		container.removeChild(stats.dom)

    if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
  }
}

export default Scene