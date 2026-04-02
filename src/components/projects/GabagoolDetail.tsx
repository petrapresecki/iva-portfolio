import { useRef, useState } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import ScrambleText from '@/components/ui/ScrambleText'
import LazyVideo from '@/components/ui/LazyVideo'

function GabagoolDetail() {
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

      const hero = gsap.timeline({ delay: 0.25 })
      hero.call(() => setTitlePlay(true))

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
      <div className="relative px-6 pb-12 pt-8 md:px-16 md:pb-20 md:pt-12">
        <h1 className="font-display text-5xl font-bold text-white md:text-7xl">
          <ScrambleText
            text="Gabagool"
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
            src="/videos/gabagool/gabagool-logo-animation.mp4"
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
          Gabagool is an Italian-style sandwich shop that transforms the culture of cured meats into a playful, vibrant visual identity. The branding centers on soft, interactive blob-like and round forms inspired by the organic shapes of sliced ham, brought to life through subtle, fluid animations.
          <br /><br />
          A bold palette of reds and pinks references the natural tones of Italian deli meats. The geometric logotype complements the rounded forms, keeping the look balanced and cohesive.
        </p>

        <div className="mt-8 flex flex-wrap gap-2 md:mt-10">
          {['Adobe Illustrator', 'Adobe After Effects', 'Adobe Photoshop'].map((tag) => (
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
        {/* Row 1: two portrait videos */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
          <div
            data-gallery
            className="aspect-[3/4] overflow-hidden rounded-xl bg-white/5 md:rounded-2xl"
          >
            <LazyVideo
              src="/videos/gabagool/gabagool-rotacija-3d.mp4"
              className="h-full w-full object-cover"
            />
          </div>
          <div
            data-gallery
            className="aspect-[3/4] overflow-hidden rounded-xl bg-white/5 md:rounded-2xl"
          >
            <LazyVideo
              src="/videos/gabagool/gabagool-sfera-meats.mp4"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Row 2: two portrait videos */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
          <div
            data-gallery
            className="aspect-[3/4] overflow-hidden rounded-xl bg-white/5 md:rounded-2xl"
          >
            <LazyVideo
              src="/videos/gabagool/gabagool-balls-bouncing.mp4"
              className="h-full w-full object-cover"
            />
          </div>
          <div
            data-gallery
            className="aspect-[3/4] overflow-hidden rounded-xl bg-white/5 md:rounded-2xl"
          >
            <LazyVideo
              src="/videos/gabagool/gabagool-kuponi.mp4"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Row 3: two portrait — video + image */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
          <div
            data-gallery
            className="aspect-[3/4] overflow-hidden rounded-xl bg-white/5 md:rounded-2xl"
          >
            <LazyVideo
              src="/videos/gabagool/gabagool-cupons-carousel.mp4"
              className="h-full w-full object-cover"
            />
          </div>
          <div
            data-gallery
            className="aspect-[3/4] overflow-hidden rounded-xl bg-white/5 md:rounded-2xl"
          >
            <img
              src="/images/gabagool/gabagool-packaging.webp"
              alt="Gabagool packaging"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* Row 4: full width showcase */}
        <div
          data-gallery
          className="overflow-hidden rounded-xl bg-white/5 md:rounded-2xl"
        >
          <img
            src="/images/gabagool/gabagool-showcase.webp"
            alt="Gabagool showcase"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Row 5: two portrait — video + image */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
          <div
            data-gallery
            className="aspect-[3/4] overflow-hidden rounded-xl bg-white/5 md:rounded-2xl"
          >
            <LazyVideo
              src="/videos/gabagool/gabagool-blobs-motion.mp4"
              className="h-full w-full object-cover"
            />
          </div>
          <div
            data-gallery
            className="aspect-[3/4] overflow-hidden rounded-xl bg-white/5 md:rounded-2xl"
          >
            <img
              src="/images/gabagool/gabagool-bag.webp"
              alt="Gabagool bag"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* Row 6: two square videos */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
          <div
            data-gallery
            className="aspect-square overflow-hidden rounded-xl bg-white/5 md:rounded-2xl"
          >
            <LazyVideo
              src="/videos/gabagool/gabagool-type-tiles.mp4"
              className="h-full w-full object-cover"
            />
          </div>
          <div
            data-gallery
            className="aspect-square overflow-hidden rounded-xl bg-white/5 md:rounded-2xl"
          >
            <LazyVideo
              src="/videos/gabagool/gabagool-colors.mp4"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default GabagoolDetail
