//@ Modules
import * as THREE from "three"

const initSceneLoader = (
  manager: THREE.LoadingManager,
  loaderElement: HTMLElement,
  percentElement: HTMLElement,
  onLoadedCallback: () => void
) => {

  //C: Track and display loading percentage
  manager.onProgress = (url, itemsLoaded, itemsTotal) => {
    const progress = Math.round((itemsLoaded / itemsTotal) * 100)

    if (percentElement) {
      percentElement.innerText = progress.toString()
    }
  }

  manager.onLoad = () => {
    if (percentElement) {
      percentElement.innerText = "100"
    }

    //C: Delay for a moment so the user sees 100% before the fade
    setTimeout(() => {
      loaderElement.style.opacity = '0'

      setTimeout(() => {
        loaderElement.style.display = 'none'
        onLoadedCallback()
      }, 500)
    }, 200)
  }

  manager.onError = (url) => {
    console.error(`%c[Loader] Failed to load resource: ${url}`, 'color: #ff4444;')
  }
}

export { initSceneLoader }