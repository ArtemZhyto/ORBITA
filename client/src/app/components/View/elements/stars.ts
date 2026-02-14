//@ Modules
import * as THREE from "three"

//C: Huge radius to encompass the entire solar system
const STARS_RADIUS = 2500000

const STAR_TEXTURES = {
  low: '/images/textures/Low/1k_stars_milky_way.jpg',
  medium: '/images/textures/Medium/2k_stars_milky_way.jpg',
  high: '/images/textures/High/8k_stars_milky_way.jpg'
}

const LOG_STYLE = 'color: #9d4edd; font-weight: bold; background: #1a1a1a; padding: 2px 5px; border-radius: 3px;'

const createStars = (manager: THREE.LoadingManager) => {
  //C: Create a large sphere for the starfield
  const starsGeometry = new THREE.SphereGeometry(STARS_RADIUS, 64, 64)

  //C: Initial solid black texture to prevent flickering
  const blackTex = new THREE.DataTexture(new Uint8Array([0, 0, 0]), 1, 1, THREE.RGBFormat)
  blackTex.needsUpdate = true

  const starsMaterial = new THREE.MeshBasicMaterial({
    map: blackTex,
    side: THREE.BackSide //C: Render on the inside of the sphere
  })

  const stars = new THREE.Mesh(starsGeometry, starsMaterial)
  const loader = new THREE.TextureLoader(manager)

  //C: Recursive function to progressively load higher resolution textures
  const loadNext = (path: string, nextPath?: string, finalPath?: string) => {
    loader.load(path, (tex) => {
      starsMaterial.map = tex
      starsMaterial.needsUpdate = true

      const fileName = path.split('/').pop()
      console.log(`%c[Stars] Background updated: ${fileName}`, LOG_STYLE)

      if (nextPath) {
        loadNext(nextPath, finalPath)
      } else {
        console.log('%c[Stars] Maximum resolution reached', LOG_STYLE)
      }
    })
  }

  //C: Start the progressive loading chain
  loadNext(STAR_TEXTURES.low, STAR_TEXTURES.medium, STAR_TEXTURES.high)

  return stars
}

export { createStars }