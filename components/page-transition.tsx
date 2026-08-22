import { type ReactNode } from 'react'

interface MotionItemProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function MotionItem({
  children,
  className = '',
}: MotionItemProps) {
  return (
    <div className={className}>
      {children}
    </div>
  )
}
