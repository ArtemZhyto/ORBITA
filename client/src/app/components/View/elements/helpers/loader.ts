//@ Modules
import * as THREE from "three"
import { getGPUTier } from "detect-gpu"

type Tier = "low" | "medium" | "high"

interface TextureManifest {
  low?: string
  medium?: string
  high?: string
  mapping?: THREE.Mapping
  colorSpace?: THREE.ColorSpace
}

const textureRegistry: { tex: THREE.Texture; manifest: TextureManifest }[] = []
const loader = new THREE.TextureLoader()

const isMobile = typeof window !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
const pauseTime = isMobile ? 100 : 50

export const loadTexture = (manifest: TextureManifest): THREE.Texture => {
  const texture = new THREE.Texture()

  if (manifest.mapping) texture.mapping = manifest.mapping
  if (manifest.colorSpace) texture.colorSpace = manifest.colorSpace

  textureRegistry.push({ tex: texture, manifest })

  return texture
}

export const startProgressiveLoading = async (
  onProgress: (percent: number) => void,
  onFirstTierLoaded: () => void
) => {
	const gpuInfo = await getGPUTier()
  const isWeakDevice = gpuInfo.tier < 2 || gpuInfo.isMobile

	const trackedTextures = textureRegistry.filter(reg => reg.manifest.low)
  let loadedCount = 0

  for (const reg of trackedTextures) {
    await loadTierSpecific(reg, "low")

    loadedCount++

    const percent = Math.min(Math.floor((loadedCount / trackedTextures.length) * 100), 100)

    onProgress(percent)

    await new Promise(r => setTimeout(r, pauseTime))
  }

  onFirstTierLoaded()

  await new Promise(r => setTimeout(r, 500))

  for (const reg of textureRegistry) {
    if (reg.manifest.medium) {
      await loadTierSpecific(reg, "medium")
      await new Promise(r => setTimeout(r, 100))
    }
  }

  if (!isWeakDevice) {
    setTimeout(async () => {
      for (const reg of textureRegistry) {
        if (reg.manifest.high) {
          await loadTierSpecific(reg, "high")
          await new Promise(r => setTimeout(r, 300))
        }
      }
    }, 4000)
  }
}

async function loadTierSpecific(reg: any, tier: Tier) {
  const url = reg.manifest[tier]
  if (!url) return Promise.resolve()

  return new Promise<void>((resolve) => {
    loader.load(url, async (loadedImage) => {
      if ('decode' in loadedImage.image) {
        try {
          await loadedImage.image.decode()
        } catch (e) {
          console.error("Decode failed", e)
        }
      }

      reg.tex.dispose()
      reg.tex.image = loadedImage.image
      reg.tex.needsUpdate = true

      if (reg.manifest.colorSpace) reg.tex.colorSpace = reg.manifest.colorSpace
      resolve()
    }, undefined, () => resolve())
  })
}