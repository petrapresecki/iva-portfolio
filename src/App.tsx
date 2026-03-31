import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { initLenis, destroyLenis } from '@/lib/lenis'
import Portfolio from '@/components/sections/Portfolio'
import ProjectDetail from '@/components/sections/ProjectDetail'
import About from '@/components/sections/About'
import CustomCursor from '@/components/ui/CustomCursor'
import type { Project } from '@/data/projects'

type Tab = 'portfolio' | 'about'

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('portfolio')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  useEffect(() => {
    initLenis()
    return () => {
      destroyLenis()
    }
  }, [])

  // Push history state when opening a project, pop on browser back
  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
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
    setActiveTab(tab)
  }

  return (
    <div className="grain">
      <CustomCursor />
      <div className="min-h-screen bg-black">
        <AnimatePresence mode="wait">
          {selectedProject ? (
            <motion.main
              key={`project-${selectedProject.id}`}
              initial={{ y: '100vh' }}
              animate={{ y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ type: 'tween', duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            >
              <ProjectDetail
                project={selectedProject}
                onClose={handleProjectClose}
              />
            </motion.main>
          ) : activeTab === 'portfolio' ? (
            <motion.main
              key="portfolio"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Portfolio onProjectClick={handleProjectClick} onTabChange={handleTabChange} />
            </motion.main>
          ) : (
            <motion.main
              key="about"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <About />
            </motion.main>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default App
