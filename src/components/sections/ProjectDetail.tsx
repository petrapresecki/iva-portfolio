import { useEffect } from 'react'
import { motion } from 'framer-motion'
import type { Project } from '@/data/projects'
import ApuroDetail from '@/components/projects/ApuroDetail'
import RoolDetail from '@/components/projects/RoolDetail'
import GabagoolDetail from '@/components/projects/GabagoolDetail'
import BookletDetail from '@/components/projects/BookletDetail'

interface ProjectDetailProps {
  project: Project
  onClose: () => void
}

const projectComponents: Record<string, React.ComponentType> = {
  apuro: ApuroDetail,
  rool: RoolDetail,
  gabagool: GabagoolDetail,
  booklet: BookletDetail,
}

function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  // Scroll to top when opening a project
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [project.id])

  const Content = projectComponents[project.id]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-black"
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
    </motion.div>
  )
}

export default ProjectDetail
