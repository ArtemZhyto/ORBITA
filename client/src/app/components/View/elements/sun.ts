//@ Modules
import * as THREE from "three"

//@ Components
import { createSunMesh } from "./mesh/sun-mesh"

//C: Constant for solar rotation rate
const SUN_ROTATION_SPEED = 0.00001

const Sun = (manager: THREE.LoadingManager) => {
  //C: Container for sun mesh and its glow layers
  const sunGroup = new THREE.Group()

  const visualSun = createSunMesh(manager)
  sunGroup.add(visualSun)

  sunGroup.userData = {
    //C: Rotation logic applied per frame
    update: () => {
      visualSun.rotation.y += SUN_ROTATION_SPEED
    }
  }

  return sunGroup
}

//C: Exporting the functional component for scene integration

export default Sun