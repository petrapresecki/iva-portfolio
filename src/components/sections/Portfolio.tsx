import { useRef, useState } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { projects } from '@/data/projects'
import type { Project } from '@/data/projects'
import ScrambleText from '@/components/ui/ScrambleText'
import LazyVideo from '@/components/ui/LazyVideo'

interface PortfolioProps {
  onProjectClick: (project: Project) => void
}

function Portfolio({ onProjectClick }: PortfolioProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [playingTitles, setPlayingTitles] = useState<Set<string>>(new Set())
  const [playHeading, setPlayHeading] = useState(false)

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches
      if (prefersReduced) {
        setPlayingTitles(new Set(projects.map((p) => p.id)))
        return
      }

      // Heading reveal
      const heading = sectionRef.current?.querySelector('.projects-heading')
      if (heading) {
        gsap.from(heading, {
          yPercent: 40,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 85%',
            toggleActions: 'play none none none',
            onEnter: () => setPlayHeading(true),
          },
        })
      }

      // Each project: line reveals + scroll-triggered title scramble
      const items = sectionRef.current?.querySelectorAll('.project-item')
      items?.forEach((el, i) => {
        const topLine = el.querySelector('.project-line-top')
        const subLine = el.querySelector('.project-line-sub')

        if (topLine) {
          gsap.from(topLine, {
            scaleX: 0,
            transformOrigin: 'left center',
            duration: 1,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          })
        }

        // Trigger title scramble on scroll
        gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            onEnter: () => {
              setPlayingTitles((prev) => new Set(prev).add(projects[i].id))
            },
          },
        })

        if (subLine) {
          gsap.from(subLine, {
            scaleX: 0,
            transformOrigin: 'left center',
            duration: 1,
            ease: 'power2.inOut',
            delay: 0.1,
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          })
        }
      })
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} className="min-h-screen bg-black">
      {/* Hero video */}
      <div className="md:px-[60px]">
        <video
          className="aspect-[16/9] w-full rounded-[15px] object-cover"
          src="/videos/hero.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      {/* PROJECTS heading */}
      <div id="projects" className="px-6 pt-16 md:px-[60px] md:pt-24">
        <h2 className="projects-heading font-display text-[36px] font-bold leading-none text-accent md:text-[72px]">
          <ScrambleText
            text="PROJECTS"
            play={playHeading}
            charDelay={100}
            cycleSpeed={40}
          />
        </h2>
      </div>

      {/* Project list */}
      <div className="mt-12 md:mt-20">
        {projects.map((project, index) => {
          const imageRight = index % 2 === 0
          return (
            <div
              key={project.id}
              className="project-item cursor-pointer md:cursor-default"
              onClick={() => onProjectClick(project)}
            >
              {/* Top line */}
              <div className="px-6 md:px-[60px]">
                <div className="project-line-top h-[3px] bg-accent" />
              </div>

              {/* Title row — clickable, highlight on hover */}
              <div
                role="button"
                className="group relative cursor-pointer overflow-hidden px-6 py-3 md:px-[60px] md:py-4 project-link before:absolute before:top-0 before:bottom-0 before:left-6 before:right-6 md:before:left-[60px] md:before:right-[60px] before:translate-y-full before:bg-accent before:transition-transform before:duration-300 before:ease-out hover:before:translate-y-0"
                onClick={() => onProjectClick(project)}
              >
                <h3 className="project-title relative z-10 font-display text-[40px] font-bold leading-tight text-accent transition-all duration-200 group-hover:ml-[18px] group-hover:text-black md:text-[64px]">
                  <ScrambleText
                    text={project.title}
                    play={playingTitles.has(project.id)}
                    charDelay={100}
                    cycleSpeed={40}
                  />
                </h3>
              </div>

              {/* Sub line */}
              <div className="px-6 md:px-[60px]">
                <div className="project-line-sub h-[3px] bg-accent" />
              </div>

              {/* Image + metadata area */}
              <div
                className={`flex flex-col gap-3 px-6 pb-4 md:gap-4 md:px-[60px] md:pb-8 ${
                  imageRight
                    ? 'md:items-end'
                    : 'md:items-start'
                }`}
              >
                {/* Image */}
                <div
                  className={`w-full md:w-1/2 ${
                    imageRight ? 'md:ml-auto' : 'md:mr-auto'
                  }`}
                >
                  <div className="project-image overflow-hidden">
                    {project.video ? (
                      <LazyVideo
                        src={project.video}
                        className="aspect-[16/9] w-full object-cover"
                      />
                    ) : (
                      <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="aspect-[16/9] w-full object-cover"
                        loading="lazy"
                      />
                    )}
                  </div>
                </div>

                {/* Year + category below image */}
                <div
                  className={`project-meta w-full md:w-1/2 ${
                    imageRight
                      ? 'md:ml-auto md:text-right'
                      : 'md:mr-auto md:text-left'
                  }`}
                >
                  <p className="font-display text-[18px] font-light text-accent md:text-[24px]">
                    {project.year}
                  </p>
                  <p className="mt-1 font-display text-[24px] font-light text-accent md:text-[32px]">
                    {project.category}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Contact */}
      <div className="px-6 pb-16 pt-8 md:px-[60px] md:pb-20 md:pt-12">
        <div className="h-[3px] bg-accent" />
        <div className="flex items-baseline justify-between py-4 md:py-6">
          <p className="font-display text-[18px] font-light text-accent md:text-[24px]">
            Contact
          </p>
          <a
            href="mailto:presecki.iva@gmail.com"
            className="font-display text-[18px] font-light text-accent transition-opacity hover:opacity-70 md:text-[24px]"
          >
            presecki.iva@gmail.com
          </a>
        </div>
        <div className="h-[3px] bg-accent" />
      </div>
    </section>
  )
}

export default Portfolio
