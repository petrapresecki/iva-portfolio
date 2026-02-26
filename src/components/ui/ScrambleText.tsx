import { useEffect, useRef } from 'react'
import { useTextScramble } from '@/hooks/useTextScramble'

interface ScrambleTextProps {
  text: string
  play: boolean
  charDelay?: number
  cycleSpeed?: number
  delay?: number
}

function ScrambleText({
  text,
  play,
  charDelay,
  cycleSpeed,
  delay,
}: ScrambleTextProps) {
  const { displayText, trigger } = useTextScramble({
    text,
    charDelay,
    cycleSpeed,
    delay,
  })
  const hasTriggered = useRef(false)

  useEffect(() => {
    if (play && !hasTriggered.current) {
      hasTriggered.current = true
      trigger()
    }
  }, [play, trigger])

  return <>{displayText || '\u00A0'}</>
}

export default ScrambleText
