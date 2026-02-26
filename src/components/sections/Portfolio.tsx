import Marquee from '@/components/ui/Marquee'
import EllipseCarousel from '@/components/ui/EllipseCarousel'
import ProjectsGrid from '@/components/sections/ProjectsGrid'

function Portfolio() {
  return (
    <section className="relative z-0 min-h-screen">
      <Marquee />
      <EllipseCarousel />
      <ProjectsGrid />
    </section>
  )
}

export default Portfolio
