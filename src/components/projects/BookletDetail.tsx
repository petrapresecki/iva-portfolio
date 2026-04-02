import { useRef, useState } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import ScrambleText from '@/components/ui/ScrambleText'
import LazyVideo from '@/components/ui/LazyVideo'

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
            src="/videos/booklet/booklet-hero.mp4"
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
          The booklet is a 41-page exploration of upcycled fashion, reflecting its unpredictable, rule-breaking nature through a dynamic visual language. Each spread embraces a different aesthetic and expression, mirroring the way upcycled pieces combine diverse fabrics, patterns, materials, shapes, and textures.
          <br /><br />
          The design rejects repetitive consistency in favor of bold, unexpected compositions, just like the garments it celebrates. The tactile nature of the 3D modeled book enhances this experience: thick, embossed pages invite touch; sturdy metal rings provide weight and structure; and a fluid, curved plastic keychain reflects the textures of fabric, connecting the reader to the materials behind the work.
        </p>

        <div className="mt-8 flex flex-wrap gap-2 md:mt-10">
          {['Blender', 'Adobe Illustrator', 'Adobe Photoshop', 'Adobe InDesign'].map((tag) => (
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
        {/* Row 1: full width image */}
        <div
          data-gallery
          className="aspect-video overflow-hidden rounded-xl bg-white/5 md:rounded-2xl"
        >
          <img
            src="/images/booklet/booklet-ocean.webp"
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
          <LazyVideo
            src="/videos/booklet/booklet-rotation.mp4"
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
