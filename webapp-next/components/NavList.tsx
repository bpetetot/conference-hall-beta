import cn from 'classnames'
import Link from 'next/link'
import React, { ReactNode } from 'react'

import { useSelectedRoute } from '../lib/useSelectedRoute'

type NavListProps = {
  children: ReactNode
  className?: string
}

const NavList = ({ className, children }: NavListProps) => {
  return (
    <aside className={cn('py-6 px-2 sm:px-6 lg:py-0 lg:px-0 relative', className)}>
      <nav className="space-y-1 sticky top-0">{children}</nav>
    </aside>
  )
}

type NavListLinkProps = {
  href: string
  children: ReactNode
  defaultSelected?: boolean
  className?: string
  icon?: React.ComponentType<React.ComponentProps<'svg'>>
}

const NavListLink = ({
  href,
  children,
  icon: Icon,
  defaultSelected,
  className,
}: NavListLinkProps) => {
  const selected = useSelectedRoute(href, defaultSelected)

  return (
    <Link href={href}>
      <a
        className={cn(styles.link, { [styles.linkSelected]: selected }, className)}
        aria-current={selected}
      >
        {Icon && (
          <Icon
            className={cn(styles.icon, { [styles.iconSelected]: selected })}
            aria-hidden="true"
          />
        )}
        <span className="truncate">{children}</span>
      </a>
    </Link>
  )
}

const styles = {
  link: cn([
    'hover:text-gray-900',
    'hover:bg-white',
    'group',
    'rounded-md',
    'px-3',
    'py-2',
    'flex',
    'items-center',
    'text-sm',
    'font-medium',
  ]),
  linkSelected: 'bg-white text-primary-700 hover:text-primary-700',
  icon: cn([
    'text-gray-400',
    'group-hover:text-gray-500',
    'flex-shrink-0',
    '-ml-1',
    'mr-3',
    'h-6',
    'w-6',
  ]),
  iconSelected: 'text-primary-500 group-hover:text-primary-500',
}

NavList.Link = NavListLink

export default NavList
