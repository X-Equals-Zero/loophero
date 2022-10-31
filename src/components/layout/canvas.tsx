import { Canvas } from '@react-three/fiber'
import { Preload, ScrollControls } from '@react-three/drei'
import useStore from '@/helpers/store'
import { Suspense, useEffect, useRef } from 'react'


const LCanvas = ({ children }) => {
  const dom = useStore((state) => state.dom)
  useEffect(() => console.log(dom))
  return (

    <Canvas
      mode='concurrent'
      dpr={[1, 2]}
      camera={{ position: [0, 0, 10] }}


      // camera={{ position: [0, canvasRef.current, 10] }}
      style={{
        position: 'absolute',
        top: 0,
      }}
    //onCreated={(state) => state.events.connect(dom.current)}
    //** gotta fix this at some point. edit: since <dom> is inside <lcanvas>, states already connected!
    >
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
