//@ Modules
import * as THREE from "three"

//@ Components
import { loadTexture } from "../helpers/loader"

export const starsTexture = loadTexture({
  low: "/images/textures/Low/1k_stars_milky_way.webp",
  medium: "/images/textures/Medium/2k_stars_milky_way.webp",
  high: "/images/textures/High/8k_stars_milky_way.webp",
  mapping: THREE.EquirectangularReflectionMapping
})

export const dayTex = loadTexture({
  low: "/images/textures/Low/1k_earth_daymap.webp",
  medium: "/images/textures/Medium/2k_earth_daymap.webp",
  high: "/images/textures/High/8k_earth_daymap.webp",
  colorSpace: THREE.SRGBColorSpace
})

export const nightTex = loadTexture({
  low: "/images/textures/Low/1k_earth_nightmap.webp",
  medium: "/images/textures/Medium/2k_earth_nightmap.webp",
  high: "/images/textures/High/8k_earth_nightmap.webp",
  colorSpace: THREE.SRGBColorSpace
})

export const normalTex = loadTexture({
  low: "/images/textures/Low/1k_earth_normal_map.webp",
  medium: "/images/textures/Medium/2k_earth_normal_map.webp",
  high: "/images/textures/High/8k_earth_normal_map.webp"
})

export const specTex = loadTexture({
  low: "/images/textures/Low/1k_earth_specular_map.webp",
  medium: "/images/textures/Medium/2k_earth_specular_map.webp",
  high: "/images/textures/High/8k_earth_specular_map.webp"
})

export const cloudsTex = loadTexture({
  medium: "/images/textures/Medium/2k_earth_clouds.webp",
  high: "/images/textures/High/8k_earth_clouds.webp"
})

export const moonTex = loadTexture({
  low: "/images/textures/Low/1k_moon.webp",
  colorSpace: THREE.SRGBColorSpace
})