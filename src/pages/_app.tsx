import Header from '@/config'
import Dom from '@/components/layout/dom'
import '@/styles/index.css'
import dynamic from 'next/dynamic'

const LCanvas = dynamic(() => import('@/components/layout/canvas'), {
  ssr: true,
})

function App({ Component, pageProps = { title: 'index' } }) {
  return (
    <>
      {Component?.r3f && <LCanvas><Component {...pageProps} /></LCanvas>}
    </>
  )
}

export default App
