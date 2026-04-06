import { useRef, useState } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import ScrambleText from '@/components/ui/ScrambleText'
import LazyVideo from '@/components/ui/LazyVideo'

function ApuroDetail() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [titlePlay, setTitlePlay] = useState(false)

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches
      if (prefersReduced) {
        setTitlePlay(true)
        return
      }

      const ctx = containerRef.current!

      // ────────────────────────────────────────
      // Hero entrance timeline
      // ────────────────────────────────────────
      const hero = gsap.timeline({ delay: 0.25 })

      // Title — trigger scramble at start
      hero.call(() => setTitlePlay(true))

      // Green star — spin + bounce scale
      const star = ctx.querySelector('[data-a="star"]')
      if (star) {
        gsap.set(star, { scale: 0, rotation: -180, opacity: 0 })
        hero.to(
          star,
          {
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 1,
            ease: 'back.out(1.7)',
          },
          0.8,
        )
      }


    },
    { scope: containerRef },
  )

  return (
    <div ref={containerRef} className="overflow-hidden">
      {/* Hero */}
      <div className="relative px-6 pb-12 pt-20 md:px-16 md:pb-20 md:pt-24">
        <h1 className="font-display text-5xl font-bold text-white md:text-7xl">
          <ScrambleText
            text="Apuro"
            play={titlePlay}
            charDelay={100}
            cycleSpeed={40}
          />
        </h1>

        {/* Hero video */}
        <div
          data-a="hero-video"
          className="mt-8 overflow-hidden rounded-xl md:rounded-2xl"
        >
          <video
            src="/videos/apuro/apuro.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Info: description + tags */}
      <div data-a="info" className="px-6 pb-12 md:px-16 md:pb-20">
        <div className="mb-8 h-px bg-accent md:mb-10" />

        <p
          data-a="desc"
          className="max-w-[850px] font-display text-lg font-medium leading-[29px] text-white text-justify md:text-2xl"
        >
          Apuro is a refreshing craft cider made from organically grown apples from the Zagorje region. Its natural origins and bold character are embodied in a 3D-modeled bottle that follows an organic, fluid shape.
          <br /><br />
          The visual identity and branding highlight Apuro's regional roots. A hybrid creature illustration inspired by local animals; rooster, deer, and fox, paired with a dynamic logo, creates an expressive design that communicates its organic and contemporary qualities.
          <br /><br />
          The box, made from recycled cardboard, is 3D-modeled to follow the shape of the bottle, making it easy to carry and store. Animations were designed to visually express and reinforce the brand's natural and playful character.
        </p>

        <div className="mt-8 flex flex-wrap gap-2 md:mt-10">
          {['Blender', 'Adobe Illustrator', 'Adobe After Effects'].map((tag) => (
            <span
              key={tag}
              data-a="tag"
              className="flex h-[38px] items-center rounded-full border border-accent px-5 font-display text-[15px] font-medium text-accent"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Gallery */}
      <div className="flex flex-col gap-4 px-6 pb-16 md:gap-6 md:px-16 md:pb-32">
        {/* Row 1: two portrait — bottles hero + splash video */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
          <div
            data-gallery
            className="aspect-[3/4] overflow-hidden rounded-xl bg-white/5 md:rounded-2xl"
          >
            <img
              src="/images/apuro/apuro-bottles-hero.webp"
              alt="Apuro bottles with apples"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div
            data-gallery
            className="aspect-[3/4] overflow-hidden rounded-xl md:rounded-2xl"
          >
            <LazyVideo
              src="/videos/apuro/apuro-splash.mp4"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Row 2: two square videos — colors + typography */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
          <div
            data-gallery
            className="aspect-square overflow-hidden rounded-xl md:rounded-2xl"
          >
            <LazyVideo
              src="/videos/apuro/apuro-colors.mp4"
              className="h-full w-full object-cover"
            />
          </div>
          <div
            data-gallery
            className="aspect-square overflow-hidden rounded-xl md:rounded-2xl"
          >
            <LazyVideo
              src="/videos/apuro/apuro-typography.mp4"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Row 3: full width — dark bottles */}
        <div
          data-gallery
          className="aspect-[16/9] overflow-hidden rounded-xl bg-white/5 md:rounded-2xl"
        >
          <img
            src="/images/apuro/apuro-bottles-dark.jpg"
            alt="Apuro bottles in dark"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Row 5: two square images — packaging */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
          <div
            data-gallery
            className="aspect-square overflow-hidden rounded-xl bg-white/5 md:rounded-2xl"
          >
            <img
              src="/images/apuro/apuro-packaging-boxes.jpg"
              alt="Apuro packaging boxes"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div
            data-gallery
            className="aspect-square overflow-hidden rounded-xl bg-white/5 md:rounded-2xl"
          >
            <img
              src="/images/apuro/apuro-packaging-grass.jpg"
              alt="Apuro packaging on grass"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* Row 6: full width video — packaging */}
        <div
          data-gallery
          className="overflow-hidden rounded-xl md:rounded-2xl"
        >
          <LazyVideo
            src="/videos/apuro/apuro-packaging.mp4"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Row 7: two portrait — papple video + bottle moody */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
          <div
            data-gallery
            className="aspect-[3/4] overflow-hidden rounded-xl md:rounded-2xl"
          >
            <LazyVideo
              src="/videos/apuro/apuro-papple.mp4"
              className="h-full w-full object-cover"
            />
          </div>
          <div
            data-gallery
            className="aspect-[3/4] overflow-hidden rounded-xl bg-white/5 md:rounded-2xl"
          >
            <img
              src="/images/apuro/apuro-bottle-moody.jpg"
              alt="Apuro bottle moody"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApuroDetail
