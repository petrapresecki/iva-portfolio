import { useRef, useState } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import ScrambleText from '@/components/ui/ScrambleText'
import LazyVideo from '@/components/ui/LazyVideo'

function RoolDetail() {
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

      // Hero entrance timeline
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
      <div className="relative px-6 pb-12 pt-20 md:px-16 md:pb-20 md:pt-24">
        <h1 className="font-display text-5xl font-bold text-white md:text-7xl">
          <ScrambleText
            text="Rool"
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
            src="/videos/rool/rool-reel.mp4"
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
          className="max-w-[850px] font-display text-lg font-medium leading-[29px] text-white text-left md:text-2xl"
        >
          Rool is an event agency for electronic music, embodying the kinetic energy and pulsating rhythm of the scene through a bold, experimental visual language. Its logo, created with sharp edges and fluid contours, reflects the dynamic, unpredictable nature of sound, while the use of glow, metallic grays, dark reflective tones, and bright orange evoke club lights and laser shows.
          <br /><br />
          Dynamic animations translate rhythm into visual experience, and 3D-modeled metallic keychain and floating MP3 player reinforce the brand's connection to music culture.
        </p>

        <div className="mt-8 flex flex-wrap gap-2 md:mt-10">
          {['Blender', 'Adobe Illustrator', 'Adobe After Effects', 'Adobe Photoshop'].map((tag) => (
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
              src="/videos/rool/rool-mp3-tile.mp4"
              className="h-full w-full object-cover"
            />
          </div>
          <div
            data-gallery
            className="aspect-[3/4] overflow-hidden rounded-xl bg-white/5 md:rounded-2xl"
          >
            <LazyVideo
              src="/videos/rool/rool-carousel.mp4"
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
              src="/videos/rool/rool-poster-klub.mp4"
              className="h-full w-full object-cover"
            />
          </div>
          <div
            data-gallery
            className="aspect-[3/4] overflow-hidden rounded-xl bg-white/5 md:rounded-2xl"
          >
            <LazyVideo
              src="/videos/rool/rool-distortion.mp4"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Row 3: full width landscape video */}
        <div
          data-gallery
          className="aspect-video overflow-hidden rounded-xl bg-white/5 md:rounded-2xl"
        >
          <LazyVideo
            src="/videos/rool/rool-tba-dirtyline.mp4"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Row 4: two portrait videos */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
          <div
            data-gallery
            className="aspect-[3/4] overflow-hidden rounded-xl bg-white/5 md:rounded-2xl"
          >
            <LazyVideo
              src="/videos/rool/rool-story-mp3.mp4"
              className="h-full w-full object-cover"
            />
          </div>
          <div
            data-gallery
            className="aspect-[3/4] overflow-hidden rounded-xl bg-white/5 md:rounded-2xl"
          >
            <LazyVideo
              src="/videos/rool/rool-parti-blur.mp4"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Row 5: full width image */}
        <div
          data-gallery
          className="aspect-[4/3] overflow-hidden rounded-xl bg-white/5 md:rounded-2xl"
        >
          <img
            src="/images/rool/rool-composition.jpg"
            alt="Rool composition"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Row 6: two portrait videos */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
          <div
            data-gallery
            className="aspect-[3/4] overflow-hidden rounded-xl bg-white/5 md:rounded-2xl"
          >
            <LazyVideo
              src="/videos/rool/rool-sivo-anim.mp4"
              className="h-full w-full object-cover"
            />
          </div>
          <div
            data-gallery
            className="aspect-[3/4] overflow-hidden rounded-xl bg-white/5 md:rounded-2xl"
          >
            <LazyVideo
              src="/videos/rool/rool-poster-anim.mp4"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoolDetail
