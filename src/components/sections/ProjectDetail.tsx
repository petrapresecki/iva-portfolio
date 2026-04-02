import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { projects } from '@/data/projects'
import type { Project } from '@/data/projects'
import ApuroDetail from '@/components/projects/ApuroDetail'
import RoolDetail from '@/components/projects/RoolDetail'
import GabagoolDetail from '@/components/projects/GabagoolDetail'
import BookletDetail from '@/components/projects/BookletDetail'

interface ProjectDetailProps {
  project: Project
  onClose: () => void
  onNavigate: (project: Project) => void
  isActive: boolean
}

const projectComponents: Record<string, React.ComponentType> = {
  apuro: ApuroDetail,
  rool: RoolDetail,
  gabagool: GabagoolDetail,
  booklet: BookletDetail,
}

function ProjectDetail({ project, onClose, onNavigate, isActive }: ProjectDetailProps) {
  const overlayRef = useRef<HTMLDivElement>(null)

  // Scroll overlay to top each time it becomes active
  useEffect(() => {
    if (isActive && overlayRef.current) {
      overlayRef.current.scrollTop = 0
    }
  }, [isActive])

  const Content = projectComponents[project.id]

  const currentIndex = projects.findIndex((p) => p.id === project.id)
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null

  return (
    <motion.div
      ref={overlayRef}
      data-lenis-prevent
      className={`fixed inset-0 z-30 overflow-y-auto bg-black ${!isActive ? 'hidden' : ''}`}
      initial={{ y: '100vh' }}
      animate={{ y: 0 }}
      transition={{ type: 'tween', duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
    >
      {/* Floating back arrow — pinned to left edge */}
      <button
        onClick={onClose}
        aria-label="Back to portfolio"
        className="group/back fixed left-4 top-1/2 z-40 -translate-y-1/2 rounded-full border border-white/10 bg-black/60 p-2.5 backdrop-blur-sm transition-all duration-300 hover:border-accent/40 hover:bg-black/80 md:left-6 md:p-3"
      >
        <svg
          className="size-4 text-gray transition-all duration-300 group-hover/back:-translate-x-0.5 group-hover/back:text-accent md:size-5"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M12 5L7 10L12 15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Project-specific content */}
      {Content ? (
        <Content />
      ) : (
        <div className="flex items-center justify-center py-32">
          <p className="font-display text-xl text-gray">
            Project detail coming soon
          </p>
        </div>
      )}

      {/* Previous / Next project navigation */}
      {(prevProject || nextProject) && (
        <div className="flex items-center justify-between px-6 pb-16 md:px-16 md:pb-20">
          {prevProject ? (
            <button
              onClick={() => onNavigate(prevProject)}
              className="flex h-[38px] items-center rounded-full border border-accent px-6 font-display text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-black md:text-xl"
            >
              previous project
            </button>
          ) : (
            <span />
          )}
          {nextProject && (
            <button
              onClick={() => onNavigate(nextProject)}
              className="flex h-[38px] items-center rounded-full border border-accent px-6 font-display text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-black md:text-xl"
            >
              next project
            </button>
          )}
        </div>
      )}
    </motion.div>
  )
}

export default ProjectDetail
