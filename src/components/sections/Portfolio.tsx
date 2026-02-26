import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import Marquee from '@/components/ui/Marquee'
import EllipseCarousel from '@/components/ui/EllipseCarousel'
import ProjectsGrid from '@/components/sections/ProjectsGrid'
import type { Project } from '@/data/projects'

interface PortfolioProps {
  onProjectClick: (project: Project) => void
}

function Portfolio({ onProjectClick }: PortfolioProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches
      if (prefersReduced) return

      // Marquee scrolls faster — feels like it's closer to the viewer
      gsap.to(marqueeRef.current, {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Carousel moves slightly slower — middle depth layer
      gsap.to(carouselRef.current, {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: carouselRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Projects grid moves slowest — feels furthest back
      gsap.to(gridRef.current, {
        yPercent: -5,
        ease: 'none',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} className="relative z-0 min-h-screen overflow-hidden">
      <div ref={marqueeRef}>
        <Marquee />
      </div>
      <div ref={carouselRef}>
        <EllipseCarousel />
      </div>
      <div ref={gridRef}>
        <ProjectsGrid onProjectClick={onProjectClick} />
      </div>
    </section>
  )
}

export default Portfolio
