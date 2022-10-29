import Header from '@/config'
import Dom from '@/components/layout/dom'
import '@/styles/index.css'
import dynamic from 'next/dynamic'
import { Scroll } from '@react-three/drei'

const LCanvas = dynamic(() => import('@/components/layout/canvas'), {
  ssr: true,
})

function App({ Component, pageProps = { title: 'index' } }) {
  return (
    <>

      <LCanvas><Component {...pageProps} /></LCanvas>
    </>
  )
}

export default App
