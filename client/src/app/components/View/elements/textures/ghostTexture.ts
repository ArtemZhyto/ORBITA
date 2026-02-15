//@ Modules
import * as THREE from "three"

export const createGhostTexture = () => {
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 128
  const ctx = canvas.getContext('2d')!
  const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64)
  grad.addColorStop(0.0, 'rgba(255, 255, 255, 0)')
  grad.addColorStop(0.8, 'rgba(255, 255, 255, 0.01)')
  grad.addColorStop(1, 'rgba(255, 255, 255, 0)')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 128, 128)

  return new THREE.CanvasTexture(canvas)
}