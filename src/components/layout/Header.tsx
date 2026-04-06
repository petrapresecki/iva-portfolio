import { motion } from 'framer-motion'

type Tab = 'portfolio' | 'about'

interface HeaderProps {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
  variant?: 'dark' | 'light'
}

function NavPill({
  label,
  isActive,
  onClick,
}: {
  label: string
  isActive: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`nav-pill group relative !cursor-pointer overflow-hidden rounded-full border border-accent px-5 py-1.5 font-display text-[14px] font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(5,255,67,0.35)] md:px-7 md:py-2 md:text-[20px] ${
        isActive ? 'bg-accent text-black' : 'text-accent'
      }`}
    >
      {/* Background fill — scales in on hover */}
      <span
        className={`absolute inset-0 rounded-full bg-accent transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
        }`}
      />

      {/* Label */}
      <span
        className={`relative z-10 transition-colors duration-300 ${
          isActive ? 'text-black' : 'text-accent group-hover:text-black'
        }`}
      >
        {label}
      </span>
    </button>
  )
}

function Header({ activeTab, onTabChange, variant = 'dark' }: HeaderProps) {
  const isDark = variant === 'dark'

  return (
    <>
      {/* Name / logo — scrolls with page */}
      <header className="px-6 py-6 md:px-[60px] md:py-[30px]">
        <motion.button
          onClick={() => onTabChange('portfolio')}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className={`!cursor-pointer font-display text-[14px] font-medium md:text-[20px] mt-1.5 md:mt-2 ${
            isDark ? 'text-accent' : 'text-black'
          }`}
        >
          IVA PRESEČKI
        </motion.button>
      </header>

      {/* Fixed nav pills with mask/blend effect */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        className="fixed top-6 right-6 z-50 flex gap-3 md:top-[30px] md:right-[60px] mix-blend-difference"
      >
        <NavPill
          label="PORTFOLIO"
          isActive={activeTab === 'portfolio'}
          onClick={() => onTabChange('portfolio')}
        />
        <NavPill
          label="ABOUT"
          isActive={activeTab === 'about'}
          onClick={() => onTabChange('about')}
        />
      </motion.nav>
    </>
  )
}

export default Header
