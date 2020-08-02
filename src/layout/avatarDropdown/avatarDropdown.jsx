import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@k-redux-router/react-k-ramel'

import IconLabel from 'components/iconLabel'
import Avatar from 'components/avatar'
import Dropdown from 'components/dropdown'
import { useAuth } from 'features/auth'

import './avatarDropdown.css'

const AvatarDropdown = ({ contributorsRoute }) => {
  const { user, signout } = useAuth()

  if (!user) return null

  const { displayName, photoURL } = user
  const avatar = <Avatar src={photoURL} name={displayName} className="avatar-dropdown-button" />

  return (
    <Dropdown className="avatar-dropdown" action={avatar} darkMode>
      <div>{displayName}</div>
      <Link code="home">
        <IconLabel icon="fa fa-home" label="Conference Hall" />
      </Link>
      <Link code={contributorsRoute}>
        <IconLabel icon="fa fa-github-alt" label="Contributors" />
      </Link>
      <button onClick={signout} type="button">
        <IconLabel icon="fa fa-sign-out" label="Sign out" />
      </button>
    </Dropdown>
  )
}

AvatarDropdown.propTypes = {
  contributorsRoute: PropTypes.string.isRequired,
}

export default AvatarDropdown
