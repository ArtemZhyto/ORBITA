//@ Modules
import * as THREE from "three"
import { Lensflare, LensflareElement } from "three/examples/jsm/Addons.js"

export const setupLensflare = (sunLight: THREE.DirectionalLight, coreTex: THREE.Texture, ghostTex: THREE.Texture) => {
  const lensflare = new Lensflare()
  lensflare.addElement(new LensflareElement(coreTex, 100, 0, sunLight.color))
  lensflare.addElement(new LensflareElement(ghostTex, 200, 0.2, new THREE.Color(0x9fbefc)))
  lensflare.addElement(new LensflareElement(ghostTex, 100, 0.3, new THREE.Color(0xa8ffa8)))
  lensflare.addElement(new LensflareElement(ghostTex, 150, 0.4, new THREE.Color(0xffb5ce)))
  lensflare.addElement(new LensflareElement(ghostTex, 150, 0.5, new THREE.Color(0xffffff)))
  lensflare.addElement(new LensflareElement(ghostTex, 120, 0.7, new THREE.Color(0xc4c4ff)))
  lensflare.addElement(new LensflareElement(ghostTex, 80, 0.8, new THREE.Color(0xffffff)))
  sunLight.add(lensflare)
}