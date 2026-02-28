//@ Modules
import * as THREE from "three"

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

export const loadTexture = (manifest: TextureManifest): THREE.Texture => {
  let texture: THREE.Texture
  if (typeof window !== "undefined") {
    const canvas = document.createElement("canvas")
    canvas.width = 1
    canvas.height = 1
    texture = new THREE.CanvasTexture(canvas)
  } else {
    texture = new THREE.Texture()
  }

  if (manifest.mapping) texture.mapping = manifest.mapping
  if (manifest.colorSpace) texture.colorSpace = manifest.colorSpace

  textureRegistry.push({ tex: texture, manifest })
  return texture
}

export const startProgressiveLoading = async (
  onProgress: (percent: number) => void,
  onFirstTierLoaded: () => void
) => {
  const tiers: Tier[] = ["low", "medium", "high"]
  let totalTexturesToLoad = 0

  textureRegistry.forEach(reg => {
    if (reg.manifest.low || reg.manifest.medium) totalTexturesToLoad++
  })

  let loadedInFirstTier = 0

  for (const tier of tiers) {
    await loadTier(tier, (isFirstTier) => {
      if (tier === "low" || (tier === "medium" && !textureRegistry[0].manifest.low)) {
        loadedInFirstTier++
        const percent = Math.round((loadedInFirstTier / totalTexturesToLoad) * 100)
        onProgress(percent)
      }
    })

    if (tier === "low") {
      onFirstTierLoaded()
    }
  }
}

async function loadTier(tier: Tier, onItemLoaded?: (isFirst: boolean) => void) {
  const promises = textureRegistry.map(({ tex, manifest }) => {
    const url = manifest[tier]
    if (!url) {
      if (tier === "low") onItemLoaded?.(true)
      return Promise.resolve()
    }

    return new Promise<void>((resolve) => {
      loader.load(url, (loadedImage) => {
        tex.image = loadedImage.image
        tex.dispose()
        tex.needsUpdate = true
        if (manifest.colorSpace) tex.colorSpace = manifest.colorSpace
        onItemLoaded?.(tier === "low")
        resolve()
      }, undefined, () => {
        onItemLoaded?.(tier === "low")
        resolve()
      })
    })
  })

  return Promise.all(promises)
}