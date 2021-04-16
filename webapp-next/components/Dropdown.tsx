import { Menu, Transition } from '@headlessui/react'
import cn from 'classnames'
import Link from 'next/link'
import React, { Fragment, ReactNode } from 'react'

type DropdownProps = {
  open: boolean
  children: ReactNode
}

const Dropdown = ({ open, children }: DropdownProps) => {
  const dropdownStyle = cn([
    'origin-top-right',
    'absolute',
    'right-0',
    'mt-2',
    'w-56',
    'rounded-md',
    'shadow-lg',
    'bg-white',
    'ring-1',
    'ring-black',
    'ring-opacity-5',
    'focus:outline-none',
  ])
  return (
    <Transition
      show={open}
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items static className={dropdownStyle}>
        <div className="py-1">{children}</div>
      </Menu.Items>
    </Transition>
  )
}

type DropdownLinkProps = {
  href: string
  children: ReactNode
  className?: string
}

const DropdownLink = ({ href, children, className }: DropdownLinkProps) => (
  <Menu.Item>
    {({ active }) => (
      <Link href={href}>
        <a
          className={cn(
            'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100',
            { 'bg-gray-100 text-gray-900': active },
            className,
          )}
          role="menuitem"
        >
          {children}
        </a>
      </Link>
    )}
  </Menu.Item>
)

type DropdownButtonProps = {
  onClick: () => void
  children: ReactNode
  className?: string
}

const DropdownButton = ({ onClick, children, className }: DropdownButtonProps) => (
  <Menu.Item>
    {({ active }) => (
      <button
        type="button"
        onClick={onClick}
        className={cn(
          'w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left',
          { 'bg-gray-100 text-gray-900': active },
          className,
        )}
        role="menuitem"
      >
        {children}
      </button>
    )}
  </Menu.Item>
)

Dropdown.Link = DropdownLink
Dropdown.Button = DropdownButton

export default Dropdown
