import { useRef, useState } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import ScrambleText from '@/components/ui/ScrambleText'

// Each gallery item gets a unique reveal style
const reveals = [
  // Row 1: bottles — horizontal wipes, opposite directions
  { from: 'inset(0 100% 0 0)', to: 'inset(0 0% 0 0)' },     // wipe from left
  { from: 'inset(0 0 0 100%)', to: 'inset(0 0 0 0%)' },      // wipe from right
  // Row 2: videos — diagonal reveals
  { from: 'polygon(0 0, 0 0, 0 100%, 0 100%)', to: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' },
  { from: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)', to: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' },
  // Row 3: showcase — expand from center
  { from: 'inset(50% 50% 50% 50%)', to: 'inset(0% 0% 0% 0%)' },
  // Row 4: packaging — corner reveals
  { from: 'inset(100% 100% 0 0)', to: 'inset(0% 0% 0 0)' },  // from top-right
  { from: 'inset(0 0 100% 100%)', to: 'inset(0 0 0% 0%)' },   // from bottom-left
  // Row 5: wide — horizontal sweep
  { from: 'inset(0 0 0 100%)', to: 'inset(0 0 0 0%)' },
  // Row 6: closeups — vertical drops
  { from: 'inset(0 0 100% 0)', to: 'inset(0 0 0% 0)' },      // drop from top
  { from: 'inset(100% 0 0 0)', to: 'inset(0% 0 0 0)' },      // rise from bottom
]

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

      // Hero video — clip-path curtain + inner zoom-out
      const videoWrap = ctx.querySelector('[data-a="hero-video"]')
      const videoEl = videoWrap?.querySelector('video')
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

      // ────────────────────────────────────────
      // Info section — scroll-triggered
      // ────────────────────────────────────────
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

      // ────────────────────────────────────────
      // Gallery — unique reveal per item + parallax
      // ────────────────────────────────────────
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

        // Parallax
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
            src="/videos/apuro-label-animation.mp4"
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
          Apuro is a refreshing craft cider made from organically grown apples from the Zagorje region. Its natural origins and bold character are embodied in a 3D-modeled bottle that follows an organic, fluid shape.
          <br /><br />
          The visual identity and branding highlight Apuro's regional roots. A hybrid creature illustration inspired by local animals; rooster, deer, and fox, paired with a dynamic logo, creates an expressive design that communicates its organic and contemporary qualities.
          <br /><br />
          The box, made from recycled cardboard, is 3D-modeled to follow the shape of the bottle, making it easy to carry and store. Animations were designed to visually express and reinforce the brand's natural and playful character.
        </p>

        <div className="flex flex-col items-start gap-4 md:items-end">
          <div className="flex flex-wrap gap-2">
            {['Blender', 'Adobe Illustrator', 'Adobe After Effects'].map((tag) => (
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
            Branding, packaging, visual identity
          </p>
        </div>
      </div>

      {/* Gallery */}
      <div className="flex flex-col gap-4 px-6 pb-16 md:gap-6 md:px-16 md:pb-32">
        {/* Row 1: two portrait images */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
          <div
            data-gallery
            className="aspect-[3/4] overflow-hidden rounded-xl bg-white/5 md:rounded-2xl"
          >
            <img
              src="/images/apuro-bottle-detail.png"
              alt="Apuro bottle detail"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div
            data-gallery
            className="aspect-[3/4] overflow-hidden rounded-xl bg-white/5 md:rounded-2xl"
          >
            <img
              src="/images/apuro-bottles.jpg"
              alt="Apuro bottles"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* Row 2: two videos */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
          <div
            data-gallery
            className="overflow-hidden rounded-xl md:rounded-2xl"
          >
            <video
              src="/videos/apuro-colors.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover"
            />
          </div>
          <div
            data-gallery
            className="overflow-hidden rounded-xl md:rounded-2xl"
          >
            <video
              src="/videos/apuro-typography.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Row 3: full width */}
        <div
          data-gallery
          className="aspect-[16/9] overflow-hidden rounded-xl bg-white/5 md:rounded-2xl"
        >
          <img
            src="/images/apuro-showcase.png"
            alt="Apuro showcase"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Row 4: two square images */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
          <div
            data-gallery
            className="aspect-square overflow-hidden rounded-xl bg-white/5 md:rounded-2xl"
          >
            <img
              src="/images/apuro-packaging-1.jpg"
              alt="Apuro packaging 1"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div
            data-gallery
            className="aspect-square overflow-hidden rounded-xl bg-white/5 md:rounded-2xl"
          >
            <img
              src="/images/apuro-packaging-2.jpg"
              alt="Apuro packaging 2"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* Row 5: full width */}
        <div
          data-gallery
          className="aspect-[16/9] overflow-hidden rounded-xl bg-white/5 md:rounded-2xl"
        >
          <img
            src="/images/apuro-packaging-wide.jpg"
            alt="Apuro packaging wide"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Row 6: two portrait images */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
          <div
            data-gallery
            className="aspect-[3/4] overflow-hidden rounded-xl bg-white/5 md:rounded-2xl"
          >
            <img
              src="/images/apuro-closeup-1.jpg"
              alt="Apuro closeup 1"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div
            data-gallery
            className="aspect-[3/4] overflow-hidden rounded-xl bg-white/5 md:rounded-2xl"
          >
            <img
              src="/images/apuro-closeup-2.png"
              alt="Apuro closeup 2"
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
