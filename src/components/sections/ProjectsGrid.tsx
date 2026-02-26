import { useRef, useState } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { projects } from '@/data/projects'
import ScrambleText from '@/components/ui/ScrambleText'

const GAP = 24 // gap between cards in px

function ProjectsGrid() {
  const trackRef = useRef<HTMLDivElement>(null)
  const currentIndex = useRef(0)
  const isAnimating = useRef(false)
  const prevBtnRef = useRef<HTMLButtonElement>(null)
  const nextBtnRef = useRef<HTMLButtonElement>(null)

  // Scroll entrance refs
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLElement | null)[]>([])

  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Scramble triggers — set to true by ScrollTrigger callbacks
  const [headingRevealed, setHeadingRevealed] = useState(false)
  const [cardsRevealed, setCardsRevealed] = useState(false)

  // Calculate how far to shift per step
  const getCardWidth = () => {
    const firstCard = trackRef.current?.children[0] as HTMLElement | undefined
    if (!firstCard) return 0
    return firstCard.offsetWidth + GAP
  }

  // Max index: stop when the last card is fully visible
  const getMaxIndex = () => {
    const track = trackRef.current
    if (!track || !track.parentElement) return 0
    const cardWidth = getCardWidth()
    if (cardWidth === 0) return 0
    const viewportWidth = track.parentElement.offsetWidth
    const visibleCards = Math.floor(viewportWidth / cardWidth)
    return Math.max(0, projects.length - visibleCards)
  }

  const updateButtons = () => {
    if (prevBtnRef.current) {
      prevBtnRef.current.disabled = currentIndex.current <= 0
    }
    if (nextBtnRef.current) {
      nextBtnRef.current.disabled = currentIndex.current >= getMaxIndex()
    }
  }

  useGSAP(() => {
    updateButtons()
  })

  // Scroll-triggered entrances
  useGSAP(
    () => {
      if (reducedMotion) return

      gsap.set(headerRef.current, { autoAlpha: 0, y: 30 })
      gsap.to(headerRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })

      const cards = cardsRef.current.filter(Boolean) as HTMLElement[]
      gsap.set(cards, { autoAlpha: 0, y: 40 })
      gsap.to(cards, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: trackRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })

      // Text scramble triggers
      ScrollTrigger.create({
        trigger: headerRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => setHeadingRevealed(true),
      })

      ScrollTrigger.create({
        trigger: trackRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => setCardsRevealed(true),
      })
    },
    { scope: sectionRef },
  )

  const navigate = (direction: -1 | 1) => {
    if (isAnimating.current) return
    const next = currentIndex.current + direction
    if (next < 0 || next > getMaxIndex()) return

    isAnimating.current = true
    currentIndex.current = next

    updateButtons()

    gsap.to(trackRef.current, {
      x: -(next * getCardWidth()),
      duration: 0.6,
      ease: 'power3.out',
      onComplete: () => {
        isAnimating.current = false
      },
    })
  }

  return (
    <section ref={sectionRef} className="pb-16 md:pb-32">
      {/* Header row */}
      <div ref={headerRef} className="mb-8 flex items-center justify-between px-6 md:mb-12 md:px-16">
        <h2 className="font-display text-4xl font-bold text-accent md:text-7xl">
          {reducedMotion ? 'Projects' : (
            <ScrambleText text="Projects" play={headingRevealed} charDelay={70} cycleSpeed={35} />
          )}
        </h2>

        <div className="flex gap-2 md:gap-3">
          <button
            ref={prevBtnRef}
            onClick={() => navigate(-1)}
            aria-label="Previous projects"
            className="group/btn transition-all duration-300 disabled:opacity-30"
          >
            <ArrowLeft />
          </button>
          <button
            ref={nextBtnRef}
            onClick={() => navigate(1)}
            aria-label="Next projects"
            className="group/btn transition-all duration-300 disabled:opacity-30"
          >
            <ArrowRight />
          </button>
        </div>
      </div>

      {/* Horizontal carousel */}
      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex pl-6 md:pl-16"
          style={{ gap: GAP }}
        >
          {projects.map((project, index) => (
            <article
              key={project.id}
              ref={(el) => { cardsRef.current[index] = el }}
              className="group w-[85vw] shrink-0 cursor-pointer sm:w-[calc((100vw-48px-24px)/2)] lg:w-[calc((100vw-128px-48px)/3)]"
            >
              {/* Thumbnail */}
              <div className="aspect-[4/3] overflow-hidden rounded-xl bg-white md:rounded-2xl">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Info */}
              <div className="mt-4 md:mt-5">
                <h3 className="inline-block bg-accent px-2 font-display text-2xl font-bold text-black rounded-lg md:text-4xl">
                  {reducedMotion ? project.title : (
                    <ScrambleText text={project.title} play={cardsRevealed} delay={index * 150} />
                  )}
                </h3>
                <p className="mt-1 text-base text-gray md:text-lg">
                  {reducedMotion ? project.category : (
                    <ScrambleText text={project.category} play={cardsRevealed} delay={index * 150 + 80} />
                  )}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function ArrowLeft() {
  return (
    <svg className="size-9 md:size-[46px]" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="23" cy="23" r="22" className="stroke-accent transition-colors duration-300 group-hover/btn:fill-accent" strokeWidth="1.5" />
      <path d="M27 15L19 23L27 31" className="stroke-accent transition-colors duration-300 group-hover/btn:stroke-black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ArrowRight() {
  return (
    <svg className="size-9 md:size-[46px]" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="23" cy="23" r="22" className="stroke-accent transition-colors duration-300 group-hover/btn:fill-accent" strokeWidth="1.5" />
      <path d="M19 15L27 23L19 31" className="stroke-accent transition-colors duration-300 group-hover/btn:stroke-black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default ProjectsGrid
