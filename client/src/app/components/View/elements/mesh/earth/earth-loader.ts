//@ Modules
import * as THREE from "three"

const EARTH_PATHS = {
  day: [
    '/images/textures/Low/1k_earth_daymap.jpg',
    '/images/textures/Medium/2k_earth_daymap.jpg',
    '/images/textures/High/8k_earth_daymap.jpg'
  ],
  night: [
    '/images/textures/Low/1k_earth_nightmap.jpg',
    '/images/textures/Medium/2k_earth_nightmap.jpg',
    '/images/textures/High/8k_earth_nightmap.jpg'
  ],
  normal: '/images/textures/High/8k_earth_normal_map.jpg'
}

const LOG_STYLE = 'color: #44aa44; font-weight: bold; background: #1a1a1a; padding: 2px 5px; border-radius: 3px;'

const loadEarthTextures = (manager: THREE.LoadingManager, onUpdate: (type: string, tex: THREE.Texture) => void) => {
  const loader = new THREE.TextureLoader(manager)

  //C: Iteratively loads textures from low to high resolution to improve UX
  const loadSequence = (type: string, paths: string[]) => {
    const loadNext = (index: number) => {
      if (index >= paths.length) return

      loader.load(paths[index], (tex) => {
        const fileName = paths[index].split('/').pop()
        console.log(`%c[Earth Loader] ${type.toUpperCase()} updated: ${fileName}`, LOG_STYLE)

        //C: Push the newly loaded texture level back to the mesh
        onUpdate(type, tex)
        loadNext(index + 1)
      })
    }
    loadNext(0)
  }

  //C: Start parallel loading sequences for different map types
  loadSequence('day', EARTH_PATHS.day)
  loadSequence('night', EARTH_PATHS.night)

  //C: Load high-resolution normal map once
  loader.load(EARTH_PATHS.normal, (tex) => {
    console.log('%c[Earth Loader] Normal map ready', LOG_STYLE)
    onUpdate('normal', tex)
  })
}

export { loadEarthTextures }