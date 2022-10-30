import * as THREE from 'three'
import { useFrame, extend } from '@react-three/fiber'
import { useRef, useState } from 'react'
import { shaderMaterial, useScroll } from '@react-three/drei'

import vertex from './glsl/shader.vert'
import fragment from './glsl/shader.frag'
import { useRouter } from 'next/router'

const ColorShiftMaterial = shaderMaterial(
  {
    time: 0,
    color: new THREE.Color(0.05, 0.0, 1.025),
  },
  vertex,
  fragment
)

// This is the 🔑 that HMR will renew if this file is edited
// It works for THREE.ShaderMaterial as well as for drei/shaderMaterial
// @ts-ignore
ColorShiftMaterial.key = THREE.MathUtils.generateUUID()

extend({ ColorShiftMaterial })

const city = ({ waterHeight, cityHeight }) => {
  const city = [];
  const waterH = waterHeight;
  const cityH = cityHeight;
  const offsetHeight = waterHeight + (cityHeight / 2);
  if (city.length < 1) {
    for (let i = 0; i < 43; i++) {
      for (let j = 0; j < 8; j++) {
        let height = Math.random();
        city.push(
          <>
            <mesh position={[i * 0.2 - 4, j * 0.2 - 2, (height / 2) + offsetHeight]}>

              <boxBufferGeometry args={[Math.random() * 0.2, Math.random() * 0.2, height]} />
              {/* @ts-ignore */}
              <colorShiftMaterial key={ColorShiftMaterial.key} color={new THREE.Color(Math.min(Math.random(), 0.05), Math.min(Math.random(), 0.05), Math.min(Math.random() * 2, 1.025))} />
            </mesh>
            <mesh position={[i * 0.2 - 4, j * 0.2 - 2, (height / 2) + 1.5 + height]}>

              <sphereBufferGeometry args={[height / 10, 1, 1]} />
              {/* @ts-ignore */}
              <colorShiftMaterial key={ColorShiftMaterial.key} color={new THREE.Color(1, 1, 1)} />
            </mesh>
          </>
        );
      }
    }
  }
  return city;
}

const Shader = (props) => {
  const waterHeight = 1;
  const cityHeight = 1;
  const meshRef = useRef(null)
  const [hovered, setHover] = useState(false)
  const router = useRouter()
  const [cityArray, setCity] = useState([]);
  let scroll = useScroll();
  let offset = 1 - scroll?.offset;
  const demoMesh = () => {
    return (
      <mesh
        ref={meshRef}
        position={[1, 1, 1]}
        scale={hovered ? 1.1 : 1}
        onClick={() => {
          router.push(`/box`)
        }}
        onPointerOver={(e) => setHover(true)}
        onPointerOut={(e) => setHover(false)}
        {...props}
      >
        <boxBufferGeometry args={[3, 3, 1]} />
        {/* @ts-ignore */}
        <colorShiftMaterial key={ColorShiftMaterial.key} time={3} />
      </mesh>
    )
  }

  useFrame((state, delta) => {
    // if (meshRef.current) {
    //   meshRef.current.rotation.x = meshRef.current.rotation.y += 0.01
    // }
    if (meshRef.current.material) {
      meshRef.current.material.uniforms.time.value +=
        Math.sin(delta / 0.5) * Math.cos(delta / 0.5)
      state.camera.position.set(0, 0, Math.cos(((scroll.offset) * Math.PI) / 3) * 10);
      state.camera.lookAt(0, 0, 0);
    }

    if (hovered || cityArray.length < 1) {
      setCity(city({ waterHeight, cityHeight }));
    }
  })



  return (
    <>

      <mesh
        ref={meshRef}
        scale={hovered ? 1.1 : 1}
        onPointerOver={(e) => setHover(true)}
        onPointerOut={(e) => setHover(false)}>

        <boxBufferGeometry args={[13, 0.7, 1]} />
        {/* @ts-ignore */}
        <colorShiftMaterial key={ColorShiftMaterial.key} time={0.3} />
      </mesh>
      <mesh position={[0, -2, waterHeight]}>

        <boxBufferGeometry args={[13, 3, cityHeight]} />
        {/* @ts-ignore */}
        <colorShiftMaterial key={ColorShiftMaterial.key} />
      </mesh>
      <mesh position={[0, 2, 1]}>

        <boxBufferGeometry args={[13, 3, 1]} />
        {/* @ts-ignore */}
        <colorShiftMaterial key={ColorShiftMaterial.key} color={new THREE.Color(0, 1, 1)} />
      </mesh>
      {cityArray}

    </>
  )
}

export default Shader
