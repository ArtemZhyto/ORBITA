//@ Modules
import * as THREE from "three"

export const createGlowTexture = (isStreak = false) => {
  const canvas = document.createElement('canvas')
  canvas.width = isStreak ? 1024 : 512
  canvas.height = 512
  const context = canvas.getContext('2d')!
  const centerX = canvas.width / 2
  const centerY = canvas.height / 2

  const gradient = context.createRadialGradient(
    centerX, centerY, 0,
    centerX, centerY, isStreak ? canvas.width / 2 : 256
  )

  if (isStreak) {
    gradient.addColorStop(0, 'rgba(180, 220, 255, 0.8)')
    gradient.addColorStop(0.1, 'rgba(50, 100, 255, 0.3)')
    gradient.addColorStop(0.4, 'rgba(0, 0, 0, 0)')
  } else {
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
    gradient.addColorStop(0.2, 'rgba(255, 240, 180, 0.3)')
    gradient.addColorStop(0.5, 'rgba(255, 100, 0, 0.05)')
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
  }

  context.fillStyle = gradient

  if (isStreak) {
    context.fillRect(0, centerY - 20, canvas.width, 40)
  } else {
    context.fillRect(0, 0, 512, 512)
  }

  return new THREE.CanvasTexture(canvas)
}