import cn from 'classnames'
import Link from 'next/link'
import { ReactNode } from 'react'

import { useSelectedRoute } from '../../../lib/useSelectedRoute'

type NavbarItemProps = {
  href: string
  children: ReactNode
  size?: 'base' | 'sm'
  block?: boolean
}

const NavbarItem = ({ href, children, size = 'base', block }: NavbarItemProps) => {
  const selected = useSelectedRoute(href)

  const styles = cn('px-3 py-2 rounded-md font-medium', {
    ['bg-primary-900 text-white']: selected,
    ['text-primary-200 hover:bg-primary-700 hover:text-white']: !selected,
    'text-sm': size === 'sm',
    'text-base': size === 'base',
    block,
  })

  return (
    <Link href={href}>
      <a className={styles}>{children}</a>
    </Link>
  )
}

export default NavbarItem
