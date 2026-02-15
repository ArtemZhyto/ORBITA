//@ Modules
import * as THREE from "three"

export const loadTexture = (url: string, mapping?: THREE.Mapping) => {
  const loader = new THREE.TextureLoader()
  const tex = loader.load(url)
  if (mapping) tex.mapping = mapping
  return tex
}