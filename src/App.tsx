import { useEffect } from 'react'
import { initLenis, destroyLenis } from '@/lib/lenis'
import Hero from '@/components/sections/Hero'

function App() {
  useEffect(() => {
    initLenis()
    return () => {
      destroyLenis()
    }
  }, [])

  return (
    <main>
      <Hero />
    </main>
  )
}

export default App
