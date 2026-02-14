//@ Modules
import * as THREE from "three"

//@ Shaders
import { EarthShader } from "./earth-shader"

//@ Components
import { loadEarthTextures } from "./earth-loader"

const EARTH_RADIUS = 5
const LOG_STYLE = 'color: #4488ff; font-weight: bold; background: #1a1a1a; padding: 2px 5px; border-radius: 3px;'

const createEarthMesh = (manager: THREE.LoadingManager) => {
  //C: Define high-detail sphere geometry for the planet
  const earthGeometry = new THREE.SphereGeometry(EARTH_RADIUS, 64, 64)

  //C: Start with a placeholder transparent material to avoid visual glitches
  const initialMaterial = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 })
  const earth = new THREE.Mesh(earthGeometry, initialMaterial) as THREE.Mesh<THREE.SphereGeometry, THREE.Material>

  //C: Texture state management for multi-stage loading
  const textures: Record<string, THREE.Texture | null> = {
    day: null,
    night: null,
    normal: null
  }

  //C: Switches the material to the custom shader once requirements are met
  const activateShader = () => {
    if (!textures.day || !textures.night || !textures.normal) return
    if (earth.material instanceof THREE.ShaderMaterial) return

    earth.material = new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.clone(EarthShader.uniforms),
      vertexShader: EarthShader.vertexShader,
      fragmentShader: EarthShader.fragmentShader
    })

    const mat = earth.material as THREE.ShaderMaterial
    mat.uniforms.dayTexture.value = textures.day
    mat.uniforms.nightTexture.value = textures.night
    mat.uniforms.normalTexture.value = textures.normal

    console.log('%c[Earth Mesh] ShaderMaterial activated', LOG_STYLE)
  }

  //C: Handle progressive texture updates (from 1k to 8k)
  loadEarthTextures(manager, (type, tex) => {
    textures[type] = tex

    //C: If shader is already active, update its uniforms directly
    if (earth.material instanceof THREE.ShaderMaterial) {
      earth.material.uniforms[`${type}Texture`].value = tex
    } else {
      //C: Otherwise, try to initialize the shader
      activateShader()
    }
  })

  return earth
}

export { createEarthMesh }