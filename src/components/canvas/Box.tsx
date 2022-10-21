import { ReactThreeFiber, useFrame } from '@react-three/fiber'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
const sphereMesh = () => {
  let x = (args) => (
    <mesh visible

      userData={{ hello: 'world' }} position={[args[0], args[1], args[2]]} rotation={[Math.PI / 2, 0, 0]}>
      <sphereGeometry args={[0.2, 11, 11]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  )
  let i = 0;
  let result: Array<ReactThreeFiber.MeshProps> = [];
  while (i < 10) {
    result.push(x([Math.cos(i), Math.sin(i), Math.tan(i)]));
    i++;
  }

  return result;
}
const BoxComponent = ({ route }) => {
  const router = useRouter()
  // This reference will give us direct access to the THREE.Mesh object
  const mesh = useRef(null)
  const mesh2 = useRef(null)
  const vertices = new Float32Array([
    -1.0, -1.0, 1.0,
    1.0, -1.0, 1.0,
    1.0, 1.0, 1.0,

    1.0, 1.0, 1.0,
    -1.0, 1.0, 1.0,
    -1.0, -1.0, 1.0
  ]);
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [hovered2, setHover2] = useState(false)

  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) =>
    mesh.current
      ? (mesh.current.rotation.y = mesh.current.rotation.x += 0.01)
      : null
    ,
    mesh2.current
      ? (mesh2.current.rotation.x = mesh2.current.rotation.x += 0.01)
      : null
  )
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <>
      <mesh
        ref={mesh}
        onClick={() => router.push(route)}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        scale={hovered ? 1.1 : 1}
      >
        <boxBufferGeometry args={[1, 1, 1]} />
        <meshPhysicalMaterial color={route === '/' ? 'orange' : 'hotpink'} />
      </mesh>
      {sphereMesh().map((e => (<> {e}</>)))}


      <directionalLight position={[5, 5, 5]} />
      <ambientLight />
    </>
  )
}
export default BoxComponent
