import cn from 'classnames'
import Link from 'next/link'
import { ReactNode } from 'react'

type ButtonProps = ButtonStyleProps & {
  type?: 'button' | 'submit'
  onClick: () => void
  children: ReactNode
}

export const Button = ({ type = 'button', children, onClick, ...styleProps }: ButtonProps) => {
  return (
    <button type={type} onClick={onClick} className={buildStyle(styleProps)}>
      {children}
    </button>
  )
}

type ButtonLinkProps = ButtonStyleProps & {
  href: string
  children: ReactNode
}

export const ButtonLink = ({ href, children, ...styleProps }: ButtonLinkProps) => {
  return (
    <Link href={href}>
      <a className={buildStyle(styleProps)}>{children}</a>
    </Link>
  )
}

type ButtonStyleProps = {
  primary?: boolean
  secondary?: boolean
  block?: boolean
  className?: string
}

function buildStyle({ primary = false, secondary = false, block, className }: ButtonStyleProps) {
  const defaultStyle = [
    'inline-flex',
    'justify-center',
    'py-2',
    'px-4',
    'rounded-md',
    'shadow-sm',
    'text-sm',
    'font-medium',
    'border',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2',
  ]

  return cn(defaultStyle, className, {
    ['text-white bg-primary-600 border-transparent hover:bg-primary-700 focus:ring-primary-500']: primary,
    ['text-gray-700 bg-white border-gray-300 hover:bg-gray-50 focus:ring-offset-gray-100 focus:ring-indigo-500']: secondary,
    ['flex w-full']: block,
  })
}
