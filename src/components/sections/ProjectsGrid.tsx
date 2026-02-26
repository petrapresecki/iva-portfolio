import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { projects } from '@/data/projects'

const GAP = 24 // gap between cards in px

function ProjectsGrid() {
  const trackRef = useRef<HTMLDivElement>(null)
  const currentIndex = useRef(0)
  const isAnimating = useRef(false)
  const prevBtnRef = useRef<HTMLButtonElement>(null)
  const nextBtnRef = useRef<HTMLButtonElement>(null)

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
    <section className="pb-16 md:pb-32">
      {/* Header row */}
      <div className="mb-8 flex items-center justify-between px-6 md:mb-12 md:px-16">
        <h2 className="font-display text-4xl font-bold text-accent md:text-7xl">
          Projects
        </h2>

        <div className="flex gap-2 md:gap-3">
          <button
            ref={prevBtnRef}
            onClick={() => navigate(-1)}
            aria-label="Previous projects"
            className="transition-opacity disabled:opacity-40"
          >
            <ArrowLeft />
          </button>
          <button
            ref={nextBtnRef}
            onClick={() => navigate(1)}
            aria-label="Next projects"
            className="transition-opacity disabled:opacity-40"
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
          {/* Mobile: ~85vw cards, Tablet: 2 visible, Desktop: 3 visible */}
          {projects.map((project) => (
            <article
              key={project.id}
              className="w-[85vw] shrink-0 sm:w-[calc((100vw-48px-24px)/2)] lg:w-[calc((100vw-128px-48px)/3)]"
            >
              {/* Thumbnail */}
              <div className="aspect-[4/3] overflow-hidden rounded-xl bg-white md:rounded-2xl">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Info */}
              <div className="mt-4 md:mt-5">
                <h3 className="inline-block bg-accent px-2 font-display text-2xl font-bold text-black rounded-lg md:text-4xl">
                  {project.title}
                </h3>
                <p className="mt-1 text-base text-gray md:text-lg">{project.category}</p>
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
      <rect width="46" height="46" rx="23" transform="matrix(-1 0 0 1 46 0)" fill="#AAAAAA" />
      <path d="M32 22C32.5523 22 33 22.4477 33 23C33 23.5523 32.5523 24 32 24L32 23L32 22ZM12.7929 23.7071C12.4024 23.3166 12.4024 22.6834 12.7929 22.2929L19.1569 15.9289C19.5474 15.5384 20.1805 15.5384 20.5711 15.9289C20.9616 16.3195 20.9616 16.9526 20.5711 17.3431L14.9142 23L20.5711 28.6569C20.9616 29.0474 20.9616 29.6805 20.5711 30.0711C20.1805 30.4616 19.5474 30.4616 19.1569 30.0711L12.7929 23.7071ZM32 23L32 24L13.5 24L13.5 23L13.5 22L32 22L32 23Z" fill="black" />
    </svg>
  )
}

function ArrowRight() {
  return (
    <svg className="size-9 md:size-[46px]" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="46" height="46" rx="23" fill="#AAAAAA" />
      <path d="M14 22C13.4477 22 13 22.4477 13 23C13 23.5523 13.4477 24 14 24L14 23L14 22ZM33.2071 23.7071C33.5976 23.3166 33.5976 22.6834 33.2071 22.2929L26.8431 15.9289C26.4526 15.5384 25.8195 15.5384 25.4289 15.9289C25.0384 16.3195 25.0384 16.9526 25.4289 17.3431L31.0858 23L25.4289 28.6569C25.0384 29.0474 25.0384 29.6805 25.4289 30.0711C25.8195 30.4616 26.4526 30.4616 26.8431 30.0711L33.2071 23.7071ZM14 23L14 24L32.5 24L32.5 23L32.5 22L14 22L14 23Z" fill="black" />
    </svg>
  )
}

export default ProjectsGrid
