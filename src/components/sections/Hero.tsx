import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'

function Hero() {
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.from('.hero-title', {
        y: 80,
        opacity: 0,
        duration: 1.2,
        delay: 0.3,
      })
      gsap.from('.hero-subtitle', {
        y: 40,
        opacity: 0,
        duration: 1,
        delay: 0.6,
      })
    },
    { scope: container },
  )

  return (
    <section
      ref={container}
      className="flex min-h-screen flex-col items-center justify-center"
    >
      <h1 className="hero-title font-display text-6xl font-bold tracking-tight md:text-8xl">
        Iva
      </h1>
      <p className="hero-subtitle mt-4 text-lg text-secondary/60">
        Graphic Designer
      </p>
    </section>
  )
}

export default Hero
