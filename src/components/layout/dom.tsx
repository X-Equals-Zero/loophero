import { setState } from '@/helpers/store'
import { Scroll } from '@react-three/drei'
import { useEffect, useRef } from 'react'

const Dom = ({ children }) => {
  const ref = useRef(null);
  useEffect(() => {
    setState({ dom: ref })
  }, [])

  return (

    <div ref={ref}
      className='mt-96 left-0 z-10 w-screen h-screen overflow-visible text-3xl text-center dom'

    >
      {children}
    </div>

  )
}

export default Dom
