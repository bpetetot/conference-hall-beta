import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import IconLabel from 'components/iconLabel'
import Avatar from 'components/avatar'
import Dropdown from 'components/dropdown'
import { useAuth } from 'features/auth'
import { getTopRoute } from 'features/router/utils'

import './avatarDropdown.css'

const AvatarDropdown = () => {
  const { user, signout } = useAuth()

  const location = useLocation()
  const topRoute = getTopRoute(location.pathname)

  if (!user) return null

  const { displayName, photoURL } = user
  const avatar = <Avatar src={photoURL} name={displayName} className="avatar-dropdown-button" />

  return (
    <Dropdown className="avatar-dropdown" action={avatar} darkMode>
      <div>{displayName}</div>
      <Link to="/">
        <IconLabel icon="fa fa-home" label="Conference Hall" />
      </Link>
      <Link to={`${topRoute}/contributors`}>
        <IconLabel icon="fa fa-github-alt" label="Contributors" />
      </Link>
      <button onClick={signout} type="button">
        <IconLabel icon="fa fa-sign-out" label="Sign out" />
      </button>
    </Dropdown>
  )
}

export default AvatarDropdown
