import { useRef, useState } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { projects } from '@/data/projects'
import type { Project } from '@/data/projects'
import ScrambleText from '@/components/ui/ScrambleText'

interface PortfolioProps {
  onProjectClick: (project: Project) => void
}

function Portfolio({ onProjectClick }: PortfolioProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [playingTitles, setPlayingTitles] = useState<Set<string>>(new Set())

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
      <div className="px-6 md:px-[60px]">
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
      <div className="px-6 pt-16 md:px-[60px] md:pt-24">
        <h2 className="projects-heading font-display text-[48px] font-bold leading-none text-accent md:text-[96px]">
          PROJECTS
        </h2>
      </div>

      {/* Project list */}
      <div className="mt-12 px-6 md:mt-20 md:px-[60px]">
        {projects.map((project, index) => {
          const imageRight = index % 2 === 0
          return (
            <div
              key={project.id}
              className="project-item cursor-pointer md:cursor-default"
              onClick={() => onProjectClick(project)}
            >
              {/* Top line */}
              <div className="project-line-top h-[3px] bg-accent" />

              {/* Title row — clickable, highlight on hover */}
              <div
                className="group cursor-pointer overflow-hidden py-3 transition-colors duration-200 hover:bg-accent md:py-4 project-link"
                onClick={() => onProjectClick(project)}
              >
                <h3 className="project-title font-display text-[40px] font-bold leading-tight text-accent transition-colors duration-200 group-hover:text-black md:text-[64px]">
                  <ScrambleText
                    text={project.title}
                    play={playingTitles.has(project.id)}
                    charDelay={100}
                    cycleSpeed={40}
                  />
                </h3>
              </div>

              {/* Sub line */}
              <div className="project-line-sub h-[3px] bg-accent" />

              {/* Image + metadata area */}
              <div
                className={`flex flex-col gap-6 py-8 md:py-12 ${
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
                      <video
                        src={project.video}
                        className="aspect-[16/9] w-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
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

      {/* E-MAIL button */}
      <div className="flex justify-end px-6 pb-16 md:px-[60px] md:pb-20">
        <a
          href="mailto:presecki.iva@gmail.com"
          className="inline-block rounded-full border border-accent px-7 py-2 font-display text-[16px] font-bold tracking-[0.8px] text-accent transition-colors duration-200 hover:bg-accent hover:text-black md:text-[20px]"
        >
          E-MAIL
        </a>
      </div>
    </section>
  )
}

export default Portfolio
