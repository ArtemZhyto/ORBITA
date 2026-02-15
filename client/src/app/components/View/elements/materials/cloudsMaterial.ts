//@ Modules
import * as THREE from "three"

export const createCloudsMaterial = (cloudsTex: THREE.Texture) => {
  const material = new THREE.MeshStandardMaterial({
    alphaMap: cloudsTex,
    transparent: true,
    depthWrite: false,
    opacity: 0.5
  })

  material.onBeforeCompile = (shader) => {
    shader.uniforms.lightDirection = { value: new THREE.Vector3() }
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", `#include <common>\nvarying vec3 vWorldNormal;`)
      .replace("#include <beginnormal_vertex>", `#include <beginnormal_vertex>\nvWorldNormal = normalize(mat3(modelMatrix) * objectNormal);`)

    shader.fragmentShader = shader.fragmentShader
      .replace("#include <common>", `#include <common>\nuniform vec3 lightDirection;\nvarying vec3 vWorldNormal;`)
      .replace("#include <opaque_fragment>", `
        float light = dot(normalize(vWorldNormal), normalize(lightDirection));
        float mixFactor = smoothstep(-0.2, 0.1, light);
        outgoingLight *= mixFactor;
        #include <opaque_fragment>
      `)
    material.userData.shader = shader
  }

  return material
}