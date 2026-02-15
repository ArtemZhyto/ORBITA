//@ Modules
import * as THREE from "three"

export const createEarthMaterial = (dayTex: THREE.Texture, nightTex: THREE.Texture, normalTex: THREE.Texture, specTex: THREE.Texture) => {
  const material = new THREE.MeshStandardMaterial({
    map: dayTex,
    normalMap: normalTex,
    normalScale: new THREE.Vector2(15, 15),
    roughness: 1.0,
    metalness: 0.0
  })

  material.onBeforeCompile = (shader) => {
    shader.uniforms.nightMap = { value: nightTex }
    shader.uniforms.specularMap = { value: specTex }
    shader.uniforms.lightDirection = { value: new THREE.Vector3() }

    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", `#include <common>\nvarying vec3 vWorldNormal;`)
      .replace("#include <beginnormal_vertex>", `#include <beginnormal_vertex>\nvWorldNormal = normalize(mat3(modelMatrix) * objectNormal);`)

    shader.fragmentShader = shader.fragmentShader
      .replace("#include <common>", `#include <common>\nuniform sampler2D nightMap;\nuniform sampler2D specularMap;\nuniform vec3 lightDirection;\nvarying vec3 vWorldNormal;`)
      .replace("#include <map_fragment>", `
        #include <map_fragment>
        vec4 dayColor = texture2D(map, vMapUv);
        vec4 nightColor = texture2D(nightMap, vMapUv);
        float light = dot(normalize(vWorldNormal), normalize(lightDirection));
        float mixFactor = smoothstep(-0.1, 0.0, light);
        nightColor.rgb *= 25.0;
        diffuseColor.rgb = mix(nightColor.rgb, dayColor.rgb, mixFactor);
      `)
      .replace("#include <roughnessmap_fragment>", `
        #include <roughnessmap_fragment>
        float waterMask = texture2D(specularMap, vMapUv).r;
        roughnessFactor = mix(0.9, 0.5, waterMask);
      `)
    material.userData.shader = shader
  }

  return material
}