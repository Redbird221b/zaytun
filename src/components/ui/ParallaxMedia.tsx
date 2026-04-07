import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '../../lib/cn'

type ParallaxMediaProps = {
  className?: string
  imgClassName?: string
  overlayClassName?: string
  priority?: boolean
  speed?: number
  src: string
}

export function ParallaxMedia({
  className,
  imgClassName,
  overlayClassName,
  priority = false,
  speed = 56,
  src,
}: ParallaxMediaProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    offset: ['start end', 'end start'],
    target: ref,
  })
  const y = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [-speed, speed])

  return (
    <div className={cn('absolute inset-0 overflow-hidden', className)} ref={ref}>
      <motion.img
        alt=""
        aria-hidden={true}
        className={cn('h-[112%] w-full object-cover', imgClassName)}
        loading={priority ? 'eager' : 'lazy'}
        src={src}
        style={{ y }}
      />
      <div className={cn('absolute inset-0', overlayClassName)} />
    </div>
  )
}
