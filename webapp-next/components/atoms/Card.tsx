import cn from 'classnames'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
}

const Card = ({ children, className }: Props) => (
  <div className={cn('bg-white rounded-lg shadow px-5 py-6 sm:px-6', className)}>{children}</div>
)

export default Card
