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

// Per-image size multipliers — varied sizes for visual rhythm
const SIZE_MULTIPLIERS = [
  0.65, 1.1, 0.8, 1.25, 0.7, 1.0,
  0.75, 1.2, 0.6, 1.15, 0.85, 1.05,
]

// Lerp helper
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

// Pre-computed explosion vectors per image (deterministic, not random)
// Each image bursts outward in a unique direction with varied distance
const EXPLOSION_SEEDS = Array.from({ length: IMAGE_COUNT }, (_, i) => {
  const angle = (i / IMAGE_COUNT) * Math.PI * 2 + (i % 3) * 0.4 // offset for organic feel
  const distance = 1.2 + (i % 4) * 0.3 // varied burst distances (1.2–2.1x viewport)
  const spinDir = i % 2 === 0 ? 1 : -1 // alternate spin directions
  return { angle, distance, spin: spinDir * (120 + (i % 5) * 60) }
})

function EllipseCarousel() {
  const containerRef = useRef<HTMLDivElement>(null)
  const rotationRef = useRef({ value: 0 })
  const explodeProgress = useRef({ value: 0 })
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])

  const updatePositions = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    const ep = explodeProgress.current.value // 0 = ellipse, 1 = fully exploded

    const cx = rect.width / 2
    const cy = rect.height * 0.46

    // Ellipse radii (constant — no breathing)
    const rx = rect.width * 0.24
    const ry = rect.height * 0.24

    // Tilt rotation matrix
    const tiltRad = (TILT * Math.PI) / 180
    const cosTilt = Math.cos(tiltRad)
    const sinTilt = Math.sin(tiltRad)

    // Base image dimensions (each image scales individually via SIZE_MULTIPLIERS)
    const baseW = Math.min(rect.width * 0.24, 280)

    // Scale controller position
    const scX = cx
    const scY = cy + ry * cosTilt + rx * Math.abs(sinTilt)
    const maxDist = 2 * Math.max(rx, ry)

    const r = rotationRef.current.value

    itemsRef.current.forEach((el, i) => {
      if (!el) return

      const t = ((i / IMAGE_COUNT) + (r / 360)) % 1
      const theta = t * Math.PI * 2

      // Point on un-tilted ellipse
      const ex = rx * Math.cos(theta)
      const ey = ry * Math.sin(theta)

      // Tangent on un-tilted ellipse
      const dtx = -rx * Math.sin(theta)
      const dty = ry * Math.cos(theta)

      // Apply tilt rotation to point
      const px = cx + ex * cosTilt - ey * sinTilt
      const py = cy + ex * sinTilt + ey * cosTilt

      // Apply tilt rotation to tangent
      const tanX = dtx * cosTilt - dty * sinTilt
      const tanY = dtx * sinTilt + dty * cosTilt

      // Normal
      const norX = -tanY
      const norY = tanX
      const norLen = Math.sqrt(norX * norX + norY * norY) || 1

      // Ellipse position
      const ellipseX = px + (norX / norLen) * OFFSET
      const ellipseY = py + (norY / norLen) * OFFSET
      const ellipseRot = Math.atan2(tanY, tanX) * (180 / Math.PI)

      // Scale on ellipse
      const dx = ellipseX - scX
      const dy = ellipseY - scY
      const dist = Math.min(Math.sqrt(dx * dx + dy * dy), maxDist)
      const ellipseScale = MAX_SCALE / 100 + (dist / maxDist) * ((MIN_SCALE - MAX_SCALE) / 100)

      // Explosion target — burst outward from center
      const seed = EXPLOSION_SEEDS[i]
      const burstRadius = Math.max(rect.width, rect.height) * seed.distance
      const explodeX = cx + Math.cos(seed.angle) * burstRadius
      const explodeY = cy + Math.sin(seed.angle) * burstRadius
      const explodeRot = ellipseRot + seed.spin
      const explodeScale = lerp(ellipseScale, 0.15, 0.8) // shrink as they fly away

      // Ease the explosion with a power curve for dramatic feel
      const easedP = ep * ep // accelerating — slow start, fast finish

      // Lerp between ellipse and explosion
      const finalX = lerp(ellipseX, explodeX, easedP)
      const finalY = lerp(ellipseY, explodeY, easedP)
      const rotation = lerp(ellipseRot, explodeRot, easedP)
      const scale = lerp(ellipseScale, explodeScale, easedP)
      const opacity = ep > 0.7 ? lerp(1, 0, (ep - 0.7) / 0.3) : 1

      const zIndex = Math.round(scale * 100)

      // Per-image size
      const imgW = baseW * SIZE_MULTIPLIERS[i]
      const imgH = imgW * 0.7

      gsap.set(el, {
        x: finalX - imgW / 2,
        y: finalY - imgH / 2,
        rotation,
        scale,
        zIndex,
        opacity,
        width: imgW,
        height: imgH,
      })
    })
  }, [])

  // Scroll-triggered entrance
  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches
      if (prefersReduced) return

      gsap.set(containerRef.current, { autoAlpha: 0, y: 50 })
      gsap.to(containerRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    },
    { scope: containerRef },
  )

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

      // Scroll-driven explosion — ellipse breaks apart as you scroll past
      gsap.to(explodeProgress.current, {
        value: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'center center',
          end: 'bottom -10%',
          scrub: true,
          onUpdate: () => updatePositions(),
        },
      })

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
