import { useRef, useCallback } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'

const IMAGE_COUNT = 12

// Placeholder colors until real images are added
const PLACEHOLDERS = [
  '#2a2a2a', '#3a3a3a', '#1e1e1e', '#4a4a4a',
  '#333333', '#292929', '#3e3e3e', '#1a1a1a',
  '#444444', '#2e2e2e', '#383838', '#222222',
]

// --- AE-matching controls ---
const TILT = -20 // ellipse slant (degrees)
const OFFSET = 0 // normal offset (push items outward from path)
const MIN_SCALE = 30 // % at max distance from scale controller
const MAX_SCALE = 110 // % at scale controller position

function EllipseCarousel() {
  const containerRef = useRef<HTMLDivElement>(null)
  const rotationRef = useRef({ value: 0 })
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])

  const updatePositions = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    const cx = rect.width / 2
    const cy = rect.height * 0.46

    // Ellipse radii
    const rx = rect.width * 0.24
    const ry = rect.height * 0.24

    // Tilt rotation matrix
    const tiltRad = (TILT * Math.PI) / 180
    const cosTilt = Math.cos(tiltRad)
    const sinTilt = Math.sin(tiltRad)

    // Image dimensions
    const baseW = Math.min(rect.width * 0.24, 280)
    const baseH = baseW * 0.7

    // Scale controller position — where items are largest (front of ellipse)
    const scX = cx
    const scY = cy + ry * cosTilt + rx * Math.abs(sinTilt)
    const maxDist = 2 * Math.max(rx, ry)

    const r = rotationRef.current.value

    itemsRef.current.forEach((el, i) => {
      if (!el) return

      // AE: t = (x / lc + (r / 360)) % 1
      const t = ((i / IMAGE_COUNT) + (r / 360)) % 1
      const theta = t * Math.PI * 2

      // Point on un-tilted ellipse
      const ex = rx * Math.cos(theta)
      const ey = ry * Math.sin(theta)

      // Tangent on un-tilted ellipse (derivative)
      const dtx = -rx * Math.sin(theta)
      const dty = ry * Math.cos(theta)

      // Apply tilt rotation to point
      const px = cx + ex * cosTilt - ey * sinTilt
      const py = cy + ex * sinTilt + ey * cosTilt

      // Apply tilt rotation to tangent
      const tanX = dtx * cosTilt - dty * sinTilt
      const tanY = dtx * sinTilt + dty * cosTilt

      // Normal (perpendicular to tangent) — AE: nor = [-tan[1], tan[0]]
      const norX = -tanY
      const norY = tanX
      const norLen = Math.sqrt(norX * norX + norY * norY) || 1

      // Final position with offset along normal
      const finalX = px + (norX / norLen) * OFFSET
      const finalY = py + (norY / norLen) * OFFSET

      // Rotation from tangent — AE: radiansToDegrees(atan2(tan[1], tan[0]))
      const rotation = Math.atan2(tanY, tanX) * (180 / Math.PI)

      // Scale based on distance from scale controller
      // AE: linear(distance, 0, maxDist, maxS/100, minS/100)
      const dx = finalX - scX
      const dy = finalY - scY
      const dist = Math.min(Math.sqrt(dx * dx + dy * dy), maxDist)
      const scale = MAX_SCALE / 100 + (dist / maxDist) * ((MIN_SCALE - MAX_SCALE) / 100)

      // Z-index: larger scale = in front
      const zIndex = Math.round(scale * 100)

      gsap.set(el, {
        x: finalX - baseW / 2,
        y: finalY - baseH / 2,
        rotation,
        scale,
        zIndex,
        width: baseW,
        height: baseH,
      })
    })
  }, [])

  useGSAP(
    () => {
      // Initial position
      updatePositions()

      // Pulsating rotation — alternates fast bursts & slow coasts
      const tl = gsap.timeline({ repeat: -1, onUpdate: updatePositions })
      tl.to(rotationRef.current, { value: 90, duration: 2, ease: 'power2.inOut' })
      tl.to(rotationRef.current, { value: 180, duration: 6, ease: 'sine.inOut' })
      tl.to(rotationRef.current, { value: 270, duration: 2, ease: 'power2.inOut' })
      tl.to(rotationRef.current, { value: 360, duration: 6, ease: 'sine.inOut' })

      // Re-layout on resize
      const onResize = () => updatePositions()
      window.addEventListener('resize', onResize)
      return () => window.removeEventListener('resize', onResize)
    },
    { scope: containerRef },
  )

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[550px] md:h-[700px] lg:h-[800px] overflow-hidden"
    >
      {Array.from({ length: IMAGE_COUNT }, (_, i) => (
        <div
          key={i}
          ref={(el) => {
            itemsRef.current[i] = el
          }}
          className="absolute top-0 left-0 rounded-sm overflow-hidden"
          style={{ willChange: 'transform' }}
        >
          <img
            src="/images/placeholder.png"
            alt={`Project ${i + 1}`}
            className="w-full h-full object-cover"
            style={{ backgroundColor: PLACEHOLDERS[i] }}
            draggable={false}
          />
        </div>
      ))}
    </div>
  )
}

export default EllipseCarousel
