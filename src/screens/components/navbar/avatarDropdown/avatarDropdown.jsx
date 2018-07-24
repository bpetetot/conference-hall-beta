import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'redux-little-router'

import IconLabel from 'components/iconLabel'
import Avatar from 'components/avatar'
import Dropdown from 'components/dropdown'

import './avatarDropdown.css'

const AvatarDropdown = ({
  baseRoute, displayName, photoURL, signout,
}) => {
  const avatar = (
    <Avatar src={photoURL} name={displayName} className="avatar-dropdown" />
  )
  return (
    <Dropdown action={avatar}>
      <div>{displayName}</div>
      <Link href="/">
        <IconLabel icon="fa fa-home" label="Conference Hall" />
      </Link>
      <Link href={`${baseRoute}/contributors`}>
        <IconLabel icon="fa fa-github-alt" label="Contributors" />
      </Link>
      <button onClick={signout} type="button">
        <IconLabel icon="fa fa-sign-out" label="Sign out" />
      </button>
    </Dropdown>
  )
}

AvatarDropdown.propTypes = {
  baseRoute: PropTypes.string,
  displayName: PropTypes.string,
  photoURL: PropTypes.string,
  signout: PropTypes.func.isRequired,
}

AvatarDropdown.defaultProps = {
  baseRoute: undefined,
  displayName: undefined,
  photoURL: undefined,
}

export default AvatarDropdown
