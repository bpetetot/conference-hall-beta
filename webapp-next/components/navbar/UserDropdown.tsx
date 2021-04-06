import cn from 'classnames'
import React, { useState } from 'react'

import { useAuth } from '../../lib/auth'
import Avatar from '../atoms/Avatar'
import Dropdown from '../atoms/Dropdown'

const UserDropdown = () => {
  const { user, signout } = useAuth()
  const [opened, setOpened] = useState(false)

  return (
    <div className="ml-3 relative">
      <button
        id="user-menu"
        type="button"
        onClick={() => setOpened(!opened)}
        className={buttonStyle}
        aria-expanded={opened}
        aria-haspopup="true"
      >
        <span className="sr-only">Open user menu</span>
        <Avatar src={user?.photoURL} name={user?.name} size="s" className="hidden md:flex" />
      </button>
      {opened && (
        <Dropdown id="user-menu" onClose={() => setOpened(false)}>
          <Dropdown.Link href="/profile">Your profile</Dropdown.Link>
          <Dropdown.Button onClick={signout}>Disconnect</Dropdown.Button>
        </Dropdown>
      )}
    </div>
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
