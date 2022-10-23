import { ReactThreeFiber, useFrame } from '@react-three/fiber'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'


// Game idea:
// spinning cube which you have to use orbit-camera to follow a certain face
//  -- maybe switch to higher poly surfaces too?
//  as you last enough time, cube spins faster (like superhexagon)
//  spinning balls are obstacles around cube
const sphereMesh = () => {
  // const [hovered, setHover] = useState(false);
  let x = (args) => {

    return (
      <mesh visible
        // onPointerOver={() => setHover(true)}
        // onPointerOut={() => setHover(false)}
        // scale={hovered ? 1.1 : 1}
        userData={{ hello: 'world' }} position={[args[0], args[1], args[2]]} rotation={[Math.PI / 2, 0, 0]}>
        <sphereGeometry args={[0.2, 11, 11]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
    )
  }
  let i = 0;
  let result: Array<ReactThreeFiber.MeshProps> = [];
  while (i < 100) {
    result.push(x([Math.cos(i), Math.sin(i), Math.sin(i)]));
    result.push(x([Math.cos(i), Math.sin(i), Math.cos(i)]));
    console.log("test" + i);
    i++;
  }

  return result;
}
const BoxComponent = ({ route }) => {
  const [SphereGrid, setSphereGrid] = useState([]);
  useEffect(() => { setSphereGrid(sphereMesh()) }, [])
  const router = useRouter()
  // This reference will give us direct access to the THREE.Mesh object
  const mesh = useRef(null)
  const mesh2 = useRef(null)
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)

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
  // :D
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
      {SphereGrid.map((e => (<> {e} </>)))}



      <directionalLight position={[5, 5, 5]} />
      <ambientLight />
    </>
  )
}
export default BoxComponent
