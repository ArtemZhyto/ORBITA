//@ Modules
import * as THREE from "three"
import Stats from "three/examples/jsm/libs/stats.module"

//@ System
import { initSceneLoader } from "./scene-loader"
import { createCamera } from "./camera"

//@ Components
import { createStars } from "./stars"
import Sun from "./sun"
import Earth from "./earth"

const LOG_STYLE = 'color: #ffffff; font-weight: bold; background: #444; padding: 2px 5px; border-radius: 3px;'

const Scene = (container: HTMLElement, loaderElement: HTMLElement, progressBar: HTMLElement, percentElement: HTMLElement) => {
  console.log('%c[System] Initializing Engine...', LOG_STYLE)

  //C: Setup loading management and performance monitoring
  const manager = new THREE.LoadingManager()
  let stats: Stats | null = null

  //C: Core Three.js setup
  const scene = new THREE.Scene()
  const w = container.clientWidth
  const h = container.clientHeight

  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(w, h)
  container.appendChild(renderer.domElement)

  //C: Initialize asset loading process
	initSceneLoader(manager, loaderElement, percentElement, () => {
		stats = new Stats()
		container.appendChild(stats.dom)
		console.log('%c[System] Resources loaded.', LOG_STYLE)
	})

  //C: Create and add celestial bodies to the scene
  const stars = createStars(manager)
  const sun = Sun(manager)
  const earth = Earth(manager)
  scene.add(stars, sun, earth)

  //C: Camera and positioning logic
  const { camera, updateCamera, initPosition } = createCamera(w, h, renderer.domElement)
  const oldPosition = new THREE.Vector3().copy(earth.position)

  //C: Set starting focus point
  initPosition(earth.position)

  const animate = () => {
    requestAnimationFrame(animate)
    if (stats) stats.begin()

    //C: Capture previous state for smooth tracking
    oldPosition.copy(earth.position)

    //C: Update logic for each celestial entity
    earth.userData.update()
    if (sun.userData.update) sun.userData.update()
    earth.userData.updateSunPosition(sun.position)

    //C: Sync camera with moving targets
    updateCamera(earth.position, oldPosition)

    renderer.render(scene, camera)
    if (stats) stats.end()
  }

  animate()
  console.log('%c[System] Animation loop started.', 'color: #888; font-style: italic;')

  const handleResize = () => {
    const newW = container.clientWidth
    const newH = container.clientHeight
    renderer.setSize(newW, newH)
    camera.aspect = newW / newH
    camera.updateProjectionMatrix()
    console.log('%c[System] Viewport resized', 'color: #666; font-size: 10px;')
  }

  window.addEventListener('resize', handleResize)

  return () => {
    //C: Cleanup scene and event listeners on destroy
    console.log('%c[System] Disposing Scene...', 'color: #ff4444; font-weight: bold;')
    renderer.dispose()
    window.removeEventListener('resize', handleResize)
    if (stats) stats.dom.remove()
  }
}

export default Scene