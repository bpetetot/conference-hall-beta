import cn from 'classnames'
import Link from 'next/link'
import React, { ReactNode } from 'react'

import { useClickOutside } from '../../lib/useClickOutside'

type DropdownProps = {
  id: string
  children: ReactNode
  onClose: () => void
}

type DropdownLinkProps = {
  href: string
  children: ReactNode
  className?: string
}

type DropdownButtonProps = {
  onClick: () => void
  children: ReactNode
  className?: string
}

const Dropdown = ({ id, children, onClose }: DropdownProps) => {
  const dropdownStyle = cn([
    'origin-top-right',
    'absolute',
    'right-0',
    'mt-2',
    'w-48',
    'rounded-md',
    'shadow-lg',
    'py-1',
    'bg-white',
    'ring-1',
    'ring-black',
    'ring-opacity-5',
    'focus:outline-none',
  ])
  const { ref } = useClickOutside({ onClose })
  return (
    <div
      ref={ref}
      className={dropdownStyle}
      role="menu"
      aria-orientation="vertical"
      aria-labelledby={id}
    >
      {children}
    </div>
  )
}

const DropdownLink = ({ href, children, className }: DropdownLinkProps) => (
  <Link href={href}>
    <a
      className={cn('block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100', className)}
      role="menuitem"
    >
      {children}
    </a>
  </Link>
)

const DropdownButton = ({ onClick, children, className }: DropdownButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    className={cn('w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left', className)}
    role="menuitem"
  >
    {children}
  </button>
)

Dropdown.Link = DropdownLink
Dropdown.Button = DropdownButton

export default Dropdown
