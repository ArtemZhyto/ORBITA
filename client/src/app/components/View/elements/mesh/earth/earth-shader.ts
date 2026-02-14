//@ Modules
import * as THREE from "three"

const EarthShader = {
  uniforms: {
    dayTexture: { value: null },
    nightTexture: { value: null },
    normalTexture: { value: null },
    sunPosition: { value: new THREE.Vector3(0, 0, 0) }
  },
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vWorldPosition;
    varying vec2 vUv;
    varying vec3 vTangent;
    varying vec3 vBitangent;

    void main() {
      vUv = uv;

      //C: Calculate tangents for correct Normal Mapping on a sphere
      vec3 c1 = cross(normal, vec3(0.0, 0.0, 1.0));
      vec3 c2 = cross(normal, vec3(0.0, 1.0, 0.0));
      vec3 tangent = normalize(c1.x > c2.x ? c1 : c2);
      vec3 bitangent = normalize(cross(tangent, normal));

      //C: Transform vectors to world space
      vTangent = normalize((modelMatrix * vec4(tangent, 0.0)).xyz);
      vBitangent = normalize((modelMatrix * vec4(bitangent, 0.0)).xyz);
      vNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
      vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D dayTexture;
    uniform sampler2D nightTexture;
    uniform sampler2D normalTexture;
    uniform vec3 sunPosition;

    varying vec3 vNormal;
    varying vec3 vWorldPosition;
    varying vec2 vUv;
    varying vec3 vTangent;
    varying vec3 vBitangent;

    void main() {
      //C: Extract and transform normal map data using TBN matrix
      vec3 normalMap = texture2D(normalTexture, vUv).rgb * 2.0 - 1.0;
      mat3 TBN = mat3(normalize(vTangent), normalize(vBitangent), normalize(vNormal));
      vec3 normal = normalize(TBN * normalMap);

      //C: Calculate lighting direction based on Sun position
      vec3 lightDir = normalize(sunPosition - vWorldPosition);
      float dotProduct = dot(normal, lightDir);

      //C: Create a smooth transition between day and night textures
      float mixStep = smoothstep(-0.2, 0.2, dotProduct);
      vec3 day = texture2D(dayTexture, vUv).rgb * max(dotProduct, 0.0);
      vec3 night = texture2D(nightTexture, vUv).rgb * (1.0 - mixStep);

      gl_FragColor = vec4(day + night, 1.0);
    }
  `
}

export { EarthShader }