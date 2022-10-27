import * as THREE from 'three'
import { useFrame, extend } from '@react-three/fiber'
import { useRef, useState } from 'react'
import { shaderMaterial } from '@react-three/drei'

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


const Shader = (props) => {

  const meshRef = useRef(null)
  const [hovered, setHover] = useState(false)
  const router = useRouter()

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
      <mesh position={[0, -2, 1]}>

        <boxBufferGeometry args={[3, 3, 1]} />
        {/* @ts-ignore */}
        <colorShiftMaterial key={ColorShiftMaterial.key} />
      </mesh>
      <mesh position={[0, 2, 1]}>

        <boxBufferGeometry args={[3, 3, 1]} />
        {/* @ts-ignore */}
        <colorShiftMaterial key={ColorShiftMaterial.key} />
      </mesh>

    </>
  )
}

export default Shader
