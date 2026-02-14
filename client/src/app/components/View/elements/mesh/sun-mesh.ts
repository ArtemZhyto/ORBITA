//@ Modules
import * as THREE from "three"

//C: Visual parameters for the solar body and its atmosphere
const SUN_TEXTURE = '/images/textures/Medium/2k_sun.jpg'
const SUN_RADIUS = 1000

const GLOW_LAYERS = [
  { radiusMult: 1.2, color: 'rgba(255, 200, 150, 1)', opacity: 0.25 },
  { radiusMult: 2.0, color: 'rgba(255, 100, 50, 1)', opacity: 0.05 }
]

const LOG_STYLE = 'color: #ffaa00; font-weight: bold; background: #1a1a1a; padding: 2px 5px; border-radius: 3px;'

//C: Generates a procedural glow effect using a canvas radial gradient
const createGlow = (radius: number, color: string, opacity: number) => {
  const geometry = new THREE.SphereGeometry(radius, 64, 64)

  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  const ctx = canvas.getContext('2d')

  if (ctx) {
    //C: Draw a soft radial gradient for the atmospheric halo
    const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128)
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0)')
    gradient.addColorStop(0.3, color.replace('1)', '0.2)'))
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 256, 256)
  }

  const texture = new THREE.CanvasTexture(canvas)
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    opacity: opacity,
    side: THREE.BackSide, //C: Render on the back side for volume effect
    blending: THREE.AdditiveBlending,
    depthWrite: false
  })

  return new THREE.Mesh(geometry, material)
}

const createSunMesh = (manager: THREE.LoadingManager) => {
  const group = new THREE.Group()

  //C: Construct the main solar core
  const sunGeometry = new THREE.SphereGeometry(SUN_RADIUS, 64, 64)
  const sunMaterial = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader(manager).load(
      SUN_TEXTURE,
      () => console.log('%c[Sun] Texture loaded successfully', LOG_STYLE),
      undefined,
      () => console.error('%c[Sun] Failed to load texture', 'color: #ff4444')
    )
  })

  const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial)
  group.add(sunMesh)

  //C: Overlay multiple glow layers to simulate the corona
  GLOW_LAYERS.forEach(layer => {
    const radius = SUN_RADIUS * layer.radiusMult
    group.add(createGlow(radius, layer.color, layer.opacity))
  })

  console.log('%c[Sun] Mesh and glow layers initialized', 'color: #ffaa00; opacity: 0.8')

  return group
}

export { createSunMesh }