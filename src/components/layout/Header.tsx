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
  isDark,
}: {
  label: string
  isActive: boolean
  onClick: () => void
  isDark: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={`nav-pill group relative !cursor-pointer overflow-hidden rounded-full border px-5 py-1.5 font-display text-[14px] font-medium transition-all duration-300 md:px-7 md:py-2 md:text-[20px] ${
        isDark
          ? 'border-accent hover:shadow-[0_0_20px_rgba(5,255,67,0.35)]'
          : 'border-black hover:shadow-[0_0_20px_rgba(0,0,0,0.2)]'
      } ${
        isActive
          ? isDark
            ? 'bg-accent text-black'
            : 'bg-black text-accent'
          : isDark
            ? 'text-accent'
            : 'text-black'
      }`}
    >
      {/* Background fill — scales in on hover */}
      <span
        className={`absolute inset-0 rounded-full transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isDark ? 'bg-accent' : 'bg-black'
        } ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}
      />

      {/* Label */}
      <span
        className={`relative z-10 transition-colors duration-300 ${
          isActive
            ? isDark
              ? 'text-black'
              : 'text-accent'
            : isDark
              ? 'text-accent group-hover:text-black'
              : 'text-black group-hover:text-accent'
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
        className={`fixed top-6 right-6 z-50 flex gap-3 md:top-[30px] md:right-[60px] ${
          isDark ? 'mix-blend-difference' : ''
        }`}
      >
        <NavPill
          label="PORTFOLIO"
          isActive={activeTab === 'portfolio'}
          onClick={() => onTabChange('portfolio')}
          isDark={isDark}
        />
        <NavPill
          label="ABOUT"
          isActive={activeTab === 'about'}
          onClick={() => onTabChange('about')}
          isDark={isDark}
        />
      </motion.nav>
    </>
  )
}

export default Header
