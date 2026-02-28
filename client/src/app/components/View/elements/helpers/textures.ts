//@ Modules
import * as THREE from "three"

//@ Components
import { loadTexture } from "../helpers/loader"

export const starsTexture = loadTexture({
  low: "/images/textures/Low/1k_stars_milky_way.jpg",
  medium: "/images/textures/Medium/2k_stars_milky_way.jpg",
  high: "/images/textures/High/8k_stars_milky_way.jpg",
  mapping: THREE.EquirectangularReflectionMapping
})

export const dayTex = loadTexture({
  low: "/images/textures/Low/1k_earth_daymap.jpg",
  medium: "/images/textures/Medium/2k_earth_daymap.jpg",
  high: "/images/textures/High/8k_earth_daymap.jpg",
  colorSpace: THREE.SRGBColorSpace
})

export const nightTex = loadTexture({
  low: "/images/textures/Low/1k_earth_nightmap.jpg",
  medium: "/images/textures/Medium/2k_earth_nightmap.jpg",
  high: "/images/textures/High/8k_earth_nightmap.jpg",
  colorSpace: THREE.SRGBColorSpace
})

export const normalTex = loadTexture({
  medium: "/images/textures/Medium/2k_earth_normal_map.jpg",
  high: "/images/textures/High/8k_earth_normal_map.jpg"
})

export const specTex = loadTexture({
  medium: "/images/textures/Medium/2k_earth_specular_map.jpg",
  high: "/images/textures/High/8k_earth_specular_map.jpg"
})

export const cloudsTex = loadTexture({
  medium: "/images/textures/Medium/2k_earth_clouds.jpg",
  high: "/images/textures/High/8k_earth_clouds.jpg"
})

export const moonTex = loadTexture({
  low: "/images/textures/Low/1k_moon.jpg",
  colorSpace: THREE.SRGBColorSpace
})