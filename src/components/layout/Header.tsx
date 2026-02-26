import { useState } from 'react'
import { motion } from 'framer-motion'

type Tab = 'portfolio' | 'about'

interface HeaderProps {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
}

const TAB_OFFSET = 20 // px the back folder peeks below the front
const PEEK_AMOUNT = -6 // px the tab lifts on hover

function Header({ activeTab, onTabChange }: HeaderProps) {
  const isPortfolio = activeTab === 'portfolio'
  const [hoveredTab, setHoveredTab] = useState<Tab | null>(null)

  return (
    <header className="sticky top-0 z-50 pt-4 md:pt-8 bg-white">
      <div className="relative h-[95px] md:h-[115px]">
        {/* Portfolio folder layer — tab + black bar (renders first = below in DOM) */}
        <motion.div
          className={`absolute inset-x-0 pointer-events-none ${!isPortfolio ? '[filter:drop-shadow(0_-3px_6px_rgba(0,0,0,0.5))] [clip-path:inset(-20px_-20px_-10px_-20px)]' : ''}`}
          style={{ zIndex: isPortfolio ? 2 : 1 }}
          animate={{
            top: isPortfolio ? TAB_OFFSET : 0,
            y: hoveredTab === 'portfolio' ? PEEK_AMOUNT : 0,
          }}
          transition={{
            top: isPortfolio
              ? { duration: 0 }
              : { type: 'spring', stiffness: 400, damping: 25 },
            y: { type: 'spring', stiffness: 400, damping: 25 },
          }}
        >
          <div className={`flex ml-4 md:ml-16 ${isPortfolio ? '[filter:drop-shadow(0_-3px_6px_rgba(0,0,0,0.5))] [clip-path:inset(-20px_-20px_0_-20px)]' : ''}`}>
            <button
              onClick={() => onTabChange('portfolio')}
              onMouseEnter={() => setHoveredTab('portfolio')}
              onMouseLeave={() => setHoveredTab(null)}
              className="tab-scallop tab-scallop-black rounded-t-xl md:rounded-t-2xl w-[130px] md:w-[220px] text-center pt-3 md:pt-4 pb-1 font-display text-[22px] md:text-[38px] font-bold leading-none bg-black text-accent cursor-pointer select-none pointer-events-auto"
            >
              Portfolio
            </button>
          </div>
          <div className="h-5 bg-black shadow-[0_18px_0_0_black]" />
        </motion.div>

        {/* About folder layer — tab + green bar (renders second = above in DOM) */}
        <motion.div
          className={`absolute inset-x-0 pointer-events-none ${isPortfolio ? '[filter:drop-shadow(0_-3px_6px_rgba(0,0,0,0.5))] [clip-path:inset(-20px_-20px_-10px_-20px)]' : ''}`}
          style={{ zIndex: isPortfolio ? 1 : 2 }}
          animate={{
            top: isPortfolio ? 0 : TAB_OFFSET,
            y: hoveredTab === 'about' ? PEEK_AMOUNT : 0,
          }}
          transition={{
            top: !isPortfolio
              ? { duration: 0 }
              : { type: 'spring', stiffness: 400, damping: 25 },
            y: { type: 'spring', stiffness: 400, damping: 25 },
          }}
        >
          <div className={`flex ml-4 md:ml-16 ${!isPortfolio ? '[filter:drop-shadow(0_-3px_6px_rgba(0,0,0,0.5))] [clip-path:inset(-20px_-20px_0_-20px)]' : ''}`}>
            {/* Spacer to position About tab to the right of Portfolio */}
            <div className="w-[145px] md:w-[260px]" />
            <button
              onClick={() => onTabChange('about')}
              onMouseEnter={() => setHoveredTab('about')}
              onMouseLeave={() => setHoveredTab(null)}
              className="tab-scallop tab-scallop-accent rounded-t-xl md:rounded-t-2xl w-[130px] md:w-[220px] text-center pt-3 md:pt-4 pb-1 font-display text-[22px] md:text-[38px] font-bold leading-none bg-accent text-black cursor-pointer select-none pointer-events-auto"
            >
              About
            </button>
          </div>
          <div className="h-5 bg-accent shadow-[0_18px_0_0_#05ff43]" />
        </motion.div>
      </div>
    </header>
  )
}

export default Header
