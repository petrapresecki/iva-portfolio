import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { projects } from '@/data/projects'
import type { Project } from '@/data/projects'

type Tab = 'portfolio' | 'about'

interface PortfolioProps {
  onProjectClick: (project: Project) => void
  onTabChange: (tab: Tab) => void
}

function Portfolio({ onProjectClick, onTabChange }: PortfolioProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches
      if (prefersReduced) return

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

      // Each project section animations
      const items = sectionRef.current?.querySelectorAll('.project-item')
      items?.forEach((el) => {
        const topLine = el.querySelector('.project-line-top')
        const title = el.querySelector('.project-title')
        const subLine = el.querySelector('.project-line-sub')
        const image = el.querySelector('.project-image')
        const meta = el.querySelector('.project-meta')

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

        if (title) {
          gsap.from(title, {
            yPercent: 100,
            duration: 0.9,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          })
        }

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

        if (image) {
          gsap.fromTo(
            image,
            { clipPath: 'inset(0 100% 0 0)' },
            {
              clipPath: 'inset(0 0% 0 0)',
              duration: 1.2,
              ease: 'power3.inOut',
              scrollTrigger: {
                trigger: el,
                start: 'top 70%',
                toggleActions: 'play none none none',
              },
            },
          )
        }

        if (meta) {
          gsap.from(meta, {
            opacity: 0,
            y: 20,
            duration: 0.7,
            delay: 0.3,
            scrollTrigger: {
              trigger: el,
              start: 'top 70%',
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
      {/* Nav buttons */}
      <nav className="flex justify-end gap-3 px-6 py-6 md:px-[60px] md:py-[30px]">
        <button
          onClick={() => onTabChange('portfolio')}
          className="cursor-pointer rounded-full bg-accent px-5 py-1.5 font-display text-[14px] font-medium text-black md:px-7 md:py-2 md:text-[20px]"
        >
          PORTFOLIO
        </button>
        <button
          onClick={() => onTabChange('about')}
          className="cursor-pointer rounded-full bg-accent px-5 py-1.5 font-display text-[14px] font-medium text-black md:px-7 md:py-2 md:text-[20px]"
        >
          ABOUT
        </button>
      </nav>

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
              className="project-item"
            >
              {/* Top line */}
              <div className="project-line-top h-[3px] bg-accent" />

              {/* Title row — clickable, highlight on hover */}
              <div
                className="group cursor-pointer overflow-hidden py-3 transition-colors duration-200 hover:bg-accent md:py-4 project-link"
                onClick={() => onProjectClick(project)}
              >
                <h3 className="project-title font-display text-[40px] font-bold leading-tight text-accent transition-colors duration-200 group-hover:text-black md:text-[64px]">
                  {project.title}
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
