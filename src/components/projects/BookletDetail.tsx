import { useRef, useState } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import ScrambleText from '@/components/ui/ScrambleText'

const reveals = [
  // Row 1: full width — expand from center
  { from: 'inset(50% 50% 50% 50%)', to: 'inset(0% 0% 0% 0%)' },
  // Row 2: pair — horizontal wipes
  { from: 'inset(0 100% 0 0)', to: 'inset(0 0% 0 0)' },
  { from: 'inset(0 0 0 100%)', to: 'inset(0 0 0 0%)' },
  // Row 3: pair — diagonal reveals
  { from: 'polygon(0 0, 0 0, 0 100%, 0 100%)', to: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' },
  { from: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)', to: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' },
  // Row 4: pair — corner reveals
  { from: 'inset(100% 100% 0 0)', to: 'inset(0% 0% 0 0)' },
  { from: 'inset(0 0 100% 100%)', to: 'inset(0 0 0% 0%)' },
  // Row 5: full width — horizontal sweep
  { from: 'inset(0 0 0 100%)', to: 'inset(0 0 0 0%)' },
  // Row 6: pair — vertical drops
  { from: 'inset(0 0 100% 0)', to: 'inset(0 0 0% 0)' },
  { from: 'inset(100% 0 0 0)', to: 'inset(0% 0 0 0)' },
  // Row 7: pair — horizontal wipes (reversed)
  { from: 'inset(0 0 0 100%)', to: 'inset(0 0 0 0%)' },
  { from: 'inset(0 100% 0 0)', to: 'inset(0 0% 0 0)' },
  // Row 8: pair — expand from center
  { from: 'inset(50% 50% 50% 50%)', to: 'inset(0% 0% 0% 0%)' },
  { from: 'inset(50% 50% 50% 50%)', to: 'inset(0% 0% 0% 0%)' },
]

function BookletDetail() {
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

      const isMobile = window.matchMedia('(max-width: 767px)').matches
      const items = ctx.querySelectorAll('[data-gallery]')
      items.forEach((item, i) => {
        const media = item.querySelector('img, video')
        if (!media) return

        if (isMobile) {
          gsap.from(item, {
            opacity: 0,
            y: 30,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          })
          return
        }

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
            text="Booklet"
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
            src="/images/booklet/booklet-hero.mp4"
            autoPlay
            loop
            muted
            playsInline
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
          The booklet is a 41-page exploration of upcycled fashion, reflecting its unpredictable, rule-breaking nature through a dynamic visual language. Each spread embraces a different aesthetic and expression, mirroring the way upcycled pieces combine diverse fabrics, patterns, materials, shapes, and textures.
          <br /><br />
          The design rejects repetitive consistency in favor of bold, unexpected compositions, just like the garments it celebrates. The tactile nature of the 3D modeled book enhances this experience: thick, embossed pages invite touch; sturdy metal rings provide weight and structure; and a fluid, curved plastic keychain reflects the textures of fabric, connecting the reader to the materials behind the work.
        </p>

        <div className="flex flex-col items-start gap-4 md:items-end">
          <div className="flex flex-wrap gap-2">
            {['Blender', 'Adobe Illustrator', 'Adobe Photoshop', 'Adobe InDesign'].map((tag) => (
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
            Editorial design, cover design
          </p>
        </div>
      </div>

      {/* Gallery */}
      <div className="flex flex-col gap-4 px-6 pb-16 md:gap-6 md:px-16 md:pb-32">
        {/* Row 1: full width image */}
        <div
          data-gallery
          className="aspect-video overflow-hidden rounded-xl bg-white/5 md:rounded-2xl"
        >
          <img
            src="/images/booklet/booklet-ocean.png"
            alt="Booklet 3D render"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Row 2: two landscape spreads */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
          <div
            data-gallery
            className="aspect-[13/10] overflow-hidden rounded-xl bg-white/5 md:rounded-2xl"
          >
            <img
              src="/images/booklet/booklet-spread-1.jpg"
              alt="Booklet spread 1"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div
            data-gallery
            className="aspect-[13/10] overflow-hidden rounded-xl bg-white/5 md:rounded-2xl"
          >
            <img
              src="/images/booklet/booklet-spread-2.jpg"
              alt="Booklet spread 2"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* Row 3: two landscape spreads */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
          <div
            data-gallery
            className="aspect-[13/10] overflow-hidden rounded-xl bg-white/5 md:rounded-2xl"
          >
            <img
              src="/images/booklet/booklet-spread-3.jpg"
              alt="Booklet spread 3"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div
            data-gallery
            className="aspect-[13/10] overflow-hidden rounded-xl bg-white/5 md:rounded-2xl"
          >
            <img
              src="/images/booklet/booklet-spread-4.jpg"
              alt="Booklet spread 4"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* Row 4: two landscape spreads */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
          <div
            data-gallery
            className="aspect-[13/10] overflow-hidden rounded-xl bg-white/5 md:rounded-2xl"
          >
            <img
              src="/images/booklet/booklet-spread-5.jpg"
              alt="Booklet spread 5"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div
            data-gallery
            className="aspect-[13/10] overflow-hidden rounded-xl bg-white/5 md:rounded-2xl"
          >
            <img
              src="/images/booklet/booklet-spread-6.jpg"
              alt="Booklet spread 6"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* Row 5: full width rotation video */}
        <div
          data-gallery
          className="aspect-video overflow-hidden rounded-xl bg-white/5 md:rounded-2xl"
        >
          <video
            src="/images/booklet/booklet-rotation.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
          />
        </div>

        {/* Row 6: two landscape spreads */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
          <div
            data-gallery
            className="aspect-[13/10] overflow-hidden rounded-xl bg-white/5 md:rounded-2xl"
          >
            <img
              src="/images/booklet/booklet-spread-7.jpg"
              alt="Booklet spread 7"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div
            data-gallery
            className="aspect-[13/10] overflow-hidden rounded-xl bg-white/5 md:rounded-2xl"
          >
            <img
              src="/images/booklet/booklet-spread-8.jpg"
              alt="Booklet spread 8"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* Row 7: two landscape spreads */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
          <div
            data-gallery
            className="aspect-[13/10] overflow-hidden rounded-xl bg-white/5 md:rounded-2xl"
          >
            <img
              src="/images/booklet/booklet-spread-9.jpg"
              alt="Booklet spread 9"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div
            data-gallery
            className="aspect-[13/10] overflow-hidden rounded-xl bg-white/5 md:rounded-2xl"
          >
            <img
              src="/images/booklet/booklet-spread-10.jpg"
              alt="Booklet spread 10"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* Row 8: two landscape spreads */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
          <div
            data-gallery
            className="aspect-[13/10] overflow-hidden rounded-xl bg-white/5 md:rounded-2xl"
          >
            <img
              src="/images/booklet/booklet-spread-11.jpg"
              alt="Booklet spread 11"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div
            data-gallery
            className="aspect-[13/10] overflow-hidden rounded-xl bg-white/5 md:rounded-2xl"
          >
            <img
              src="/images/booklet/booklet-spread-12.jpg"
              alt="Booklet spread 12"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookletDetail
