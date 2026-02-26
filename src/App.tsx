import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { initLenis, destroyLenis } from '@/lib/lenis'
import Header from '@/components/layout/Header'
import Portfolio from '@/components/sections/Portfolio'
import ProjectDetail from '@/components/sections/ProjectDetail'
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
      <Header activeTab={activeTab} onTabChange={handleTabChange} />
      <div className={`min-h-screen ${activeTab === 'portfolio' ? 'bg-black' : 'bg-accent'}`}>
        <AnimatePresence mode="wait">
          {selectedProject ? (
            <motion.main
              key={`project-${selectedProject.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
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
              <Portfolio onProjectClick={handleProjectClick} />
            </motion.main>
          ) : (
            <motion.main
              key="about"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-center min-h-screen">
                <p className="font-display text-2xl text-black font-semibold">
                  About section coming soon
                </p>
              </div>
            </motion.main>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default App
