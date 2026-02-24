import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, useGSAP)

// Set defaults for consistent animation feel
gsap.defaults({
  ease: 'power3.out',
  duration: 1,
})

export { gsap, ScrollTrigger, useGSAP }
