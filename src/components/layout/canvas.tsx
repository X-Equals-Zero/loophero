import { Canvas } from '@react-three/fiber'
import { Preload, ScrollControls } from '@react-three/drei'
import useStore from '@/helpers/store'
import { Suspense, useEffect, useRef } from 'react'


const LCanvas = ({ children }) => {
  const camera = useStore((state) => state.camera)
  return (

    <Canvas
      color='#000fff'
      dpr={[1, 2]}
      camera={{ position: [0, 0, 10], up: [0, -1, 0] }}


      // camera={{ position: [0, canvasRef.current, 10] }}
      style={{
        position: 'absolute',
        top: 0,
      }}
    //onCreated={(state) => state.events.connect(dom.current)}
    //** gotta fix this at some point. edit: since <dom> is inside <lcanvas>, states already connected!
    >
      <color attach='background' args={['gray']} />
      <Suspense fallback={null}>
        <Preload all />

        < ScrollControls
          pages={3}
          damping={15}
        >


          {children}
          {/* <LControl /> */}


        </ScrollControls >
      </Suspense>

    </Canvas >

  )
}

export default LCanvas
