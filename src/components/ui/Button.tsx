import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'

type ButtonProps = {
  children: ReactNode
  className?: string
  href?: string
  icon?: ReactNode
  target?: string
  variant?: 'primary' | 'secondary' | 'ghost'
} & ButtonHTMLAttributes<HTMLButtonElement>

const variants = {
  ghost:
    'border border-sage/10 bg-white/60 text-sage shadow-soft hover:border-sage/30 hover:bg-white',
  primary:
    'border border-sage bg-sage text-white shadow-glow hover:-translate-y-0.5 hover:bg-[#405148]',
  secondary:
    'border border-sage/10 bg-white/90 text-sage shadow-soft hover:-translate-y-0.5 hover:border-sage/30 hover:bg-white',
}

export function Button({
  children,
  className,
  href,
  icon,
  target,
  type = 'button',
  variant = 'primary',
  ...buttonProps
}: ButtonProps) {
  const sharedClassName = cn(
    'inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold tracking-[0.02em] transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage',
    variants[variant],
    className,
  )

  if (href) {
    return (
      <a className={sharedClassName} href={href} rel={target === '_blank' ? 'noreferrer' : undefined} target={target}>
        <span>{children}</span>
        {icon}
      </a>
    )
  }

  return (
    <button className={sharedClassName} type={type} {...buttonProps}>
      <span>{children}</span>
      {icon}
    </button>
  )
}
