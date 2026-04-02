import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { initLenis, destroyLenis, getLenis } from '@/lib/lenis'
import Header from '@/components/layout/Header'
import Portfolio from '@/components/sections/Portfolio'
import ProjectDetail from '@/components/sections/ProjectDetail'
import About from '@/components/sections/About'
import CustomCursor from '@/components/ui/CustomCursor'
import { projects } from '@/data/projects'
import type { Project } from '@/data/projects'

type Tab = 'portfolio' | 'about'

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('portfolio')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [openedProjects, setOpenedProjects] = useState<Set<string>>(new Set())

  useEffect(() => {
    initLenis()
    return () => {
      destroyLenis()
    }
  }, [])

  // Stop Lenis (body scroll) when a project overlay is active
  useEffect(() => {
    const lenis = getLenis()
    if (!lenis) return
    if (selectedProject) {
      lenis.stop()
    } else {
      lenis.start()
    }
  }, [selectedProject])

  // Push history state when opening a project, pop on browser back
  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
    setOpenedProjects(prev => new Set(prev).add(project.id))
    window.history.pushState({ project: project.id }, '')
  }

  const handleProjectClose = () => {
    setSelectedProject(null)
    // Go back in history if we pushed a state
    if (window.history.state?.project) {
      window.history.back()
    }
  }

  useEffect(() => {
    const onPopState = () => {
      setSelectedProject(null)
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  // When switching tabs, close any open project
  const handleTabChange = (tab: Tab) => {
    if (selectedProject && window.history.state?.project) {
      window.history.back()
    }
    setSelectedProject(null)

    if (tab === 'portfolio' && activeTab === 'portfolio') {
      // Already on portfolio — scroll to projects section
      const lenis = getLenis()
      lenis?.scrollTo('#projects', { duration: 1.2 })
      return
    }

    setActiveTab(tab)
  }

  return (
    <div className="grain">
      <CustomCursor />
      <div className="min-h-screen bg-black">
        {/* Main content (portfolio / about) */}
        <AnimatePresence mode="wait">
          {activeTab === 'portfolio' ? (
            <motion.main
              key="portfolio"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Header activeTab={activeTab} onTabChange={handleTabChange} variant="dark" />
              <Portfolio onProjectClick={handleProjectClick} />
            </motion.main>
          ) : (
            <motion.main
              key="about"
              className="bg-accent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Header activeTab={activeTab} onTabChange={handleTabChange} variant="light" />
              <About />
            </motion.main>
          )}
        </AnimatePresence>

        {/* Project detail overlays — persist once opened */}
        {projects.map(project => {
          if (!openedProjects.has(project.id)) return null
          return (
            <ProjectDetail
              key={project.id}
              project={project}
              isActive={selectedProject?.id === project.id}
              onClose={handleProjectClose}
            />
          )
        })}
      </div>
    </div>
  )
}

export default App
