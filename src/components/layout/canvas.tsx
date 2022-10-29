import { Canvas, useFrame, useThree, Color } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Preload, Scroll, ScrollControls, useScroll } from '@react-three/drei'
import useStore from '@/helpers/store'
import { Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react'


const BigCity = ({ children }) => {
  let scroll = useScroll();
  let offset = 1 - scroll.offset;

  useFrame((state, delta) => {
    state.camera.position.set(Math.sin(offset) * -10, Math.atan(offset * Math.PI * 2) * 5, Math.cos((offset * Math.PI) / 3) * -10);
    state.camera.lookAt(0, 0, 0);

  })
  return <>{children}</>

}
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
      <Preload all />
      <Suspense fallback={null}>
        < ScrollControls
          pages={3}
        >
          <BigCity>
            {children}
          </BigCity>


          {/* <LControl /> */}


        </ScrollControls >
      </Suspense>
    </Canvas>

  )
}

export default LCanvas
