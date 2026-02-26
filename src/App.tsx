import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { initLenis, destroyLenis } from '@/lib/lenis'
import Header from '@/components/layout/Header'
import Portfolio from '@/components/sections/Portfolio'
import CustomCursor from '@/components/ui/CustomCursor'

type Tab = 'portfolio' | 'about'

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('portfolio')

  useEffect(() => {
    initLenis()
    return () => {
      destroyLenis()
    }
  }, [])

  return (
    <div className="grain">
      <CustomCursor />
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <div className={`min-h-screen ${activeTab === 'portfolio' ? 'bg-black' : 'bg-accent'}`}>
        <AnimatePresence mode="wait">
          {activeTab === 'portfolio' ? (
            <motion.main
              key="portfolio"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Portfolio />
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
