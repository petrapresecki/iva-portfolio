import { useRef, useState } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import ScrambleText from '@/components/ui/ScrambleText'

const reveals = [
  // Row 1: two portrait — horizontal wipes
  { from: 'inset(0 100% 0 0)', to: 'inset(0 0% 0 0)' },
  { from: 'inset(0 0 0 100%)', to: 'inset(0 0 0 0%)' },
  // Row 2: two portrait — diagonal reveals
  { from: 'polygon(0 0, 0 0, 0 100%, 0 100%)', to: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' },
  { from: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)', to: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' },
  // Row 3: two portrait — expand from center
  { from: 'inset(50% 50% 50% 50%)', to: 'inset(0% 0% 0% 0%)' },
  { from: 'inset(50% 50% 50% 50%)', to: 'inset(0% 0% 0% 0%)' },
  // Row 4: two portrait — corner reveals
  { from: 'inset(100% 100% 0 0)', to: 'inset(0% 0% 0 0)' },
  { from: 'inset(0 0 100% 100%)', to: 'inset(0 0 0% 0%)' },
  // Row 5: two square — vertical drops
  { from: 'inset(0 0 100% 0)', to: 'inset(0 0 0% 0)' },
  { from: 'inset(100% 0 0 0)', to: 'inset(0% 0 0 0)' },
]

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

      const videoWrap = ctx.querySelector('[data-a="hero-video"]')
      const videoEl = videoWrap?.querySelector('video, img')
      if (videoWrap && videoEl) {
        gsap.set(videoWrap, { clipPath: 'inset(100% 0 0 0)' })
        gsap.set(videoEl, { scale: 1.4 })
        hero.to(
          videoWrap,
          { clipPath: 'inset(0% 0 0 0)', duration: 1.4, ease: 'power4.inOut' },
          0.3,
        )
        hero.to(
          videoEl,
          { scale: 1, duration: 2, ease: 'power2.out' },
          0.5,
        )
      }

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

      const infoSection = ctx.querySelector('[data-a="info"]')
      const infoChildren = infoSection?.querySelectorAll('[data-a="desc"], [data-a="tag"], [data-a="role"]')
      if (infoChildren?.length) {
        gsap.set(infoChildren, { y: 20, opacity: 0 })
        gsap.to(infoChildren, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: infoSection,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })
      }

      const items = ctx.querySelectorAll('[data-gallery]')
      items.forEach((item, i) => {
        const media = item.querySelector('img, video')
        if (!media) return

        const reveal = reveals[i % reveals.length]

        gsap.set(item, { clipPath: reveal.from })
        gsap.set(media, { scale: 1.3 })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        })

        tl.to(item, {
          clipPath: reveal.to,
          duration: 1.3,
          ease: 'power4.inOut',
        })
        tl.to(
          media,
          { scale: 1.05, duration: 1.8, ease: 'power2.out' },
          '-=1',
        )

        gsap.to(media, {
          yPercent: -4,
          ease: 'none',
          scrollTrigger: {
            trigger: item,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      })
    },
    { scope: containerRef },
  )

  return (
    <div ref={containerRef} className="overflow-hidden">
      {/* Hero */}
      <div className="relative px-6 pb-12 pt-8 md:px-16 md:pb-20 md:pt-12">
        <h1 className="font-display text-6xl font-bold text-white md:text-9xl">
          <ScrambleText
            text="Gabagool"
            play={titlePlay}
            charDelay={100}
            cycleSpeed={40}
          />
        </h1>

        {/* Hero image */}
        <div
          data-a="hero-video"
          className="mt-8 overflow-hidden rounded-xl md:rounded-2xl"
        >
          <img
            src="/videos/gabagool/gabagool-showcase.png"
            alt="Gabagool showcase"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Info: description + tags + role */}
      <div data-a="info" className="grid gap-8 px-6 pb-12 md:grid-cols-2 md:gap-16 md:px-16 md:pb-20">
        <p
          data-a="desc"
          className="max-w-lg font-body text-sm leading-relaxed text-gray md:text-base"
        >
          Gabagool is an Italian-style sandwich shop that transforms the culture of cured meats into a playful, vibrant visual identity. The branding centers on soft, interactive blob-like and round forms inspired by the organic shapes of sliced ham, brought to life through subtle, fluid animations.
          <br /><br />
          A bold palette of reds and pinks references the natural tones of Italian deli meats. The geometric logotype complements the rounded forms, keeping the look balanced and cohesive.
        </p>

        <div className="flex flex-col items-start gap-4 md:items-end">
          <div className="flex flex-wrap gap-2">
            {['Adobe Illustrator', 'Adobe After Effects', 'Adobe Photoshop'].map((tag) => (
              <span
                key={tag}
                data-a="tag"
                className="rounded-full border border-accent/40 px-4 py-1.5 font-display text-xs font-medium uppercase tracking-wider text-accent"
              >
                {tag}
              </span>
            ))}
          </div>
          <p
            data-a="role"
            className="font-display text-xs uppercase tracking-[0.15em] text-gray md:text-sm"
          >
            Branding, visual identity
          </p>
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
            <video
              src="/videos/gabagool/gabagool-rotacija-3d.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover"
            />
          </div>
          <div
            data-gallery
            className="aspect-[3/4] overflow-hidden rounded-xl bg-white/5 md:rounded-2xl"
          >
            <video
              src="/videos/gabagool/gabagool-sfera-meats.mp4"
              autoPlay
              loop
              muted
              playsInline
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
            <video
              src="/videos/gabagool/gabagool-balls-bouncing.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover"
            />
          </div>
          <div
            data-gallery
            className="aspect-[3/4] overflow-hidden rounded-xl bg-white/5 md:rounded-2xl"
          >
            <video
              src="/videos/gabagool/gabagool-kuponi.mp4"
              autoPlay
              loop
              muted
              playsInline
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
            <video
              src="/videos/gabagool/gabagool-cupons-carousel.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover"
            />
          </div>
          <div
            data-gallery
            className="aspect-[3/4] overflow-hidden rounded-xl bg-white/5 md:rounded-2xl"
          >
            <img
              src="/videos/gabagool/gabagool-packaging.png"
              alt="Gabagool packaging"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* Row 4: two portrait — video + image */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
          <div
            data-gallery
            className="aspect-[3/4] overflow-hidden rounded-xl bg-white/5 md:rounded-2xl"
          >
            <video
              src="/videos/gabagool/gabagool-blobs-motion.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover"
            />
          </div>
          <div
            data-gallery
            className="aspect-[3/4] overflow-hidden rounded-xl bg-white/5 md:rounded-2xl"
          >
            <img
              src="/videos/gabagool/gabagool-bag.png"
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
            <video
              src="/videos/gabagool/gabagool-type-tiles.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover"
            />
          </div>
          <div
            data-gallery
            className="aspect-square overflow-hidden rounded-xl bg-white/5 md:rounded-2xl"
          >
            <video
              src="/videos/gabagool/gabagool-colors.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default GabagoolDetail
