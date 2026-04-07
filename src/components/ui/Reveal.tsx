import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  distance?: number
  mode?: 'immediate' | 'inView'
}

export function Reveal({
  children,
  className,
  delay = 0,
  distance = 28,
  mode = 'inView',
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion()
  const visibleState = prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }

  return (
    <motion.div
      animate={mode === 'immediate' ? visibleState : undefined}
      className={className}
      initial={prefersReducedMotion ? false : { opacity: 0, y: distance }}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ amount: 0.3, once: true }}
      whileInView={mode === 'inView' ? visibleState : undefined}
    >
      {children}
    </motion.div>
  )
}
