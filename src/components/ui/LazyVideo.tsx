import { useEffect, useRef } from 'react'

interface LazyVideoProps {
  src: string
  className?: string
}

function LazyVideo({ src, className }: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!video.src) {
            video.src = src
          }
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { rootMargin: '200px' },
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [src])

  return (
    <video
      ref={videoRef}
      loop
      muted
      playsInline
      preload="none"
      className={className}
    />
  )
}

export default LazyVideo
