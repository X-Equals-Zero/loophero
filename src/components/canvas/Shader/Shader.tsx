import * as THREE from 'three'
import { useFrame, extend } from '@react-three/fiber'
import { useRef, useState } from 'react'
import { shaderMaterial, useScroll } from '@react-three/drei'

import vertex from './glsl/shader.vert'
import fragment from './glsl/shader.frag'
import { useRouter } from 'next/router'
import { sign } from 'crypto'

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



const Shader = (props) => {
  const waterHeight = 1;
  const cityHeight = 1;
  const cityRenderDelay = 500;
  const meshRef = useRef(null)
  const [hovered, setHover] = useState(false)
  const router = useRouter()

  let scroll = useScroll();
  const [startTime, setStartTime] = useState(performance.now());
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

  const city = ({ waterHeight, cityHeight }) => {
    const city = [];
    const offsetHeight = waterHeight + (cityHeight / 2);
    if (city.length < 1) {
      for (let i = 0; i < 43; i++) {
        for (let j = 0; j < 8; j++) {
          let height = Math.random();
          city.push(
            <group>
              <mesh position={[i * 0.2 - 4, j * 0.2 - 2, (height / 2) + offsetHeight]}>

                <boxGeometry args={[Math.random() * 0.2, Math.random() * 0.2, height]} />
                {/* @ts-ignore */}
                <colorShiftMaterial key={ColorShiftMaterial.key} color={new THREE.Color(Math.min(Math.random(), 0.05), Math.min(Math.random(), 0.05), Math.min(Math.random() * 2, 1.025))} />
              </mesh>
              <mesh position={[i * 0.2 - 4, j * 0.2 - 2, (height / 2) + 1.5 + height]}>

                <sphereGeometry args={[height / 10, 1, 1]} />
                {/* @ts-ignore */}
                <colorShiftMaterial key={ColorShiftMaterial.key} color={new THREE.Color(1, 1, 1)} />
              </mesh>
            </group>
          );
        }
      }
    }
    return city;
  }
  const [cityArray, setCity] = useState(city({ waterHeight, cityHeight }));
  useFrame((state, delta) => {
    // if (meshRef.current) {
    //   meshRef.current.rotation.x = meshRef.current.rotation.y += 0.01
    // }
    if (meshRef.current.material) {
      meshRef.current.material.uniforms.time.value +=
        Math.sin(delta / 0.5) * Math.cos(delta / 0.5)
      state.camera.position.set(0, 0, (Math.cos(((scroll.offset) * Math.PI) / 2.45) * 6.2));
      state.camera.rotation.set(Math.min(-Math.PI * Math.atan(scroll.offset * 2 - 0.99), 0), 0, (Math.min(Math.PI * Math.atan(scroll.offset * Math.PI), Math.PI)));
    }

    if ((hovered) && ((performance.now() - startTime) > cityRenderDelay)) {
      setCity(city({ waterHeight, cityHeight }));
      setStartTime(performance.now());

    }
  })



  return (
    <group>

      <mesh
        ref={meshRef}
        scale={hovered ? 1.1 : 1}
        onPointerOver={(e) => setHover(true)}
        onPointerOut={(e) => setHover(false)}>

        <boxGeometry args={[13, 0.7, 1]} />
        {/* @ts-ignore */}
        <colorShiftMaterial key={ColorShiftMaterial.key} time={0.3} />
      </mesh>
      <mesh position={[0, -2, waterHeight]}>

        <boxGeometry args={[13, 3, cityHeight]} />
        {/* @ts-ignore */}
        <colorShiftMaterial key={ColorShiftMaterial.key} />
      </mesh>
      <mesh position={[0, 2, 1]}>

        <boxGeometry args={[13, 3, 1]} />
        {/* @ts-ignore */}
        <colorShiftMaterial key={ColorShiftMaterial.key} color={new THREE.Color(0, 1, 1)} />
      </mesh>
      {cityArray}

    </group>
  )
}

export default Shader
