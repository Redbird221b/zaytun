import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

function IconBase(props: IconProps) {
  return (
    <svg fill="none" viewBox="0 0 24 24" {...props}>
      {props.children}
    </svg>
  )
}

export function ArrowIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M5 12h14" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" />
      <path d="M13 6l6 6-6 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
    </IconBase>
  )
}

export function StructuringIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" width="14" x="5" y="4" />
      <rect height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" width="9" x="5" y="14" />
      <path d="M16 17h3" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
    </IconBase>
  )
}

export function TreasuryIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 4v16" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
      <path d="M17 7.5c0-1.8-2.24-3.25-5-3.25S7 5.7 7 7.5s2.24 3.25 5 3.25 5 1.45 5 3.25S14.76 17.25 12 17.25 7 15.8 7 14" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
    </IconBase>
  )
}

export function GrowthIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M5 18l4-4 3 3 7-8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      <path d="M14 9h5v5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </IconBase>
  )
}

export function GovernanceIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 4l7 3v4c0 4.25-2.83 8.1-7 9-4.17-.9-7-4.75-7-9V7l7-3z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5" />
      <path d="M9.5 12l1.7 1.7 3.3-3.7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </IconBase>
  )
}
