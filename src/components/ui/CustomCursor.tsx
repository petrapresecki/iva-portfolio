import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import cursorSvg from '@/assets/cursor.svg'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    // Set initial position off-screen
    gsap.set(cursor, { xPercent: -50, yPercent: -50, x: -100, y: -100 })

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power2.out',
      })
    }

    const onMouseLeave = () => {
      gsap.to(cursor, { opacity: 0, duration: 0.2 })
    }

    const onMouseEnter = () => {
      gsap.to(cursor, { opacity: 1, duration: 0.2 })
    }

    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999]"
    >
      <img src={cursorSvg} alt="" width={40} height={37} draggable={false} />
    </div>
  )
}
