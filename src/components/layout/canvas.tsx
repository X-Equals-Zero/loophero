import { Canvas, useFrame, useThree, Color } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Preload, Scroll, ScrollControls, useScroll } from '@react-three/drei'
import useStore from '@/helpers/store'
import { Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Shader from '../canvas/Shader/Shader'

const LCanvas = ({ children }) => {
  const dom = useStore((state) => state.dom)
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
    >
      <Suspense fallback={null}>
        < ScrollControls
          pages={3}
        >
          <Preload all />
          <Shader />
          {children}
          {/* <LControl /> */}


        </ScrollControls >
      </Suspense>
    </Canvas>

  )
}

export default LCanvas
