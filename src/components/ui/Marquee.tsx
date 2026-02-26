import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import StarIcon from '@/assets/icons/star.svg?react'

const ITEMS = ['iva presečki', 'portfolio'] as const
const REPEAT_COUNT = 8

function Marquee() {
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.to('.marquee-track', {
        xPercent: -50,
        duration: 30,
        ease: 'none',
        repeat: -1,
      })
    },
    { scope: container },
  )

  const segment = ITEMS.map((text, i) => (
    <span key={i} className="flex shrink-0 items-center gap-5">
      <StarIcon className="size-6 md:size-8" />
      <span className="font-display text-lg font-bold md:text-2xl">
        {text}
      </span>
    </span>
  ))

  return (
    <div ref={container} className="overflow-hidden bg-accent text-black">
      <div className="marquee-track flex items-center gap-5 py-3">
        {Array.from({ length: REPEAT_COUNT }, (_, i) => (
          <div key={i} className="flex shrink-0 items-center gap-5">
            {segment}
          </div>
        ))}
        {/* Duplicate for seamless loop */}
        {Array.from({ length: REPEAT_COUNT }, (_, i) => (
          <div key={`dup-${i}`} className="flex shrink-0 items-center gap-5">
            {segment}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Marquee
