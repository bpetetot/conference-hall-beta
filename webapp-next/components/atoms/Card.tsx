import cn from 'classnames'
import { ReactNode } from 'react'

type CardProps = {
  children: ReactNode
  withPadding?: boolean
  className?: string
}

const Card = ({ children, withPadding = true, className }: CardProps) => (
  <div
    className={cn('bg-white rounded-lg shadow', { 'px-5 py-6 sm:px-6': withPadding }, className)}
  >
    {children}
  </div>
)

export default Card
