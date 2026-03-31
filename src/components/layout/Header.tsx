import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

type Tab = 'portfolio' | 'about'

interface HeaderProps {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
}

const SCROLL_THRESHOLD = 50
const SCROLL_DELTA = 8

function Header({ activeTab, onTabChange }: HeaderProps) {
  const [isHidden, setIsHidden] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const delta = currentScrollY - lastScrollY.current

      if (currentScrollY < SCROLL_THRESHOLD) {
        setIsHidden(false)
      } else if (delta > SCROLL_DELTA) {
        setIsHidden(true)
      } else if (delta < -SCROLL_DELTA) {
        setIsHidden(false)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      className="sticky top-0 z-50 bg-black"
      animate={{ y: isHidden ? '-100%' : '0%' }}
      transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
    >
      <div className="flex items-center justify-between px-6 py-6 md:px-[60px] md:py-[30px]">
        <span className="font-display text-[16px] font-medium text-accent md:text-[20px]">
          IVA PRESEČKI
        </span>

        <nav className="flex gap-3">
          <button
            onClick={() => onTabChange('portfolio')}
            className={`cursor-pointer rounded-full border border-accent px-5 py-1.5 font-display text-[14px] font-medium transition-colors duration-200 md:px-7 md:py-2 md:text-[20px] ${
              activeTab === 'portfolio'
                ? 'bg-accent text-black'
                : 'bg-transparent text-accent hover:bg-accent/10'
            }`}
          >
            PORTFOLIO
          </button>
          <button
            onClick={() => onTabChange('about')}
            className={`cursor-pointer rounded-full border border-accent px-5 py-1.5 font-display text-[14px] font-medium transition-colors duration-200 md:px-7 md:py-2 md:text-[20px] ${
              activeTab === 'about'
                ? 'bg-accent text-black'
                : 'bg-transparent text-accent hover:bg-accent/10'
            }`}
          >
            ABOUT
          </button>
        </nav>
      </div>
    </motion.header>
  )
}

export default Header
