import { Menu } from '@headlessui/react'
import cn from 'classnames'
import React from 'react'

import { useAuth } from '../../lib/auth'
import Avatar from '../atoms/Avatar'
import Dropdown from '../atoms/Dropdown'

const UserDropdown = () => {
  const { user, signout } = useAuth()

  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <Menu.Button className={buttonStyle}>
            <Avatar src={user?.photoURL} name={user?.name} size="s" className="hidden md:flex" />
          </Menu.Button>
          <Dropdown open={open}>
            <Dropdown.Link href="/profile">Your profile</Dropdown.Link>
            <Dropdown.Button onClick={signout}>Disconnect</Dropdown.Button>
          </Dropdown>
        </>
      )}
    </Menu>
  )
}

const buttonStyle = cn([
  'bg-gray-800',
  'flex',
  'text-sm',
  'rounded-full',
  'focus:outline-none',
  'focus:ring-2',
  'focus:ring-offset-2',
  'focus:ring-offset-gray-800',
  'focus:ring-white',
])

export default UserDropdown
