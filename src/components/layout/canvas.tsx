import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Preload, Scroll, ScrollControls, useScroll } from '@react-three/drei'
import useStore from '@/helpers/store'
import { useEffect, useRef, useState } from 'react'

const LControl = () => {
  const dom = useStore((state) => state.dom)
  const control = useRef(null)

  useEffect(() => {
    if (control.current) {
      const domElement = dom.current
      const originalTouchAction = domElement.style['touch-action']
      domElement.style['touch-action'] = 'none'

      return () => {
        domElement.style['touch-action'] = originalTouchAction
      }
    }
  }, [dom, control])
  // @ts-ignore
  return <OrbitControls ref={control} domElement={dom.current} />
}
const Camera = ({ children }) => {
  const { camera } = useThree();
  const data = useScroll();
  useFrame(() => {
    // data.offset = current scroll position, between 0 and 1, dampened
    // data.delta = current delta, between 0 and 1, dampened

    // Will be 0 when the scrollbar is at the starting position,
    // then increase to 1 until 1 / 3 of the scroll distance is reached
    const a = data.range(0, 1 / 3)
    // Will start increasing when 1 / 3 of the scroll distance is reached,
    // and reach 1 when it reaches 2 / 3rds.
    const b = data.range(1 / 3, 1 / 3)
    camera.translateY(data.offset)

  })

  return (<><perspectiveCamera ref={camera} position={[0, 0, 10]} /> {children}</>)

}
const LCanvas = ({ children }) => {
  const dom = useStore((state) => state.dom)



  return (

    <Canvas
      camera={{ position: [0, 0, 10] }}
      mode='concurrent'
      // camera={{ position: [0, canvasRef.current, 10] }}
      style={{
        position: 'absolute',
        top: 0,
      }}
      onCreated={(state) => state.events.connect(dom.current)}
    >
      <ScrollControls
        pages={3}
        distance={1}
        damping={4}
        horizontal={false}
      >
        <Scroll>
          {/* <Camera> */}
          {/* <LControl /> */}
          <Preload all />
          {children}
          {/* </Camera> */}



        </Scroll>
      </ScrollControls>
    </Canvas>

  )
}

export default LCanvas
