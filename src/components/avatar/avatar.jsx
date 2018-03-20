/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import './avatar.css'

const Avatar = ({ displayName, photoURL, className }) => {
  if (!displayName) return null
  const classes = cn(
    'avatar',
    { 'avatar-initials': !photoURL, 'avatar-image': photoURL },
    className,
  )
  return (
    <div className={classes}>
      {photoURL && <img src={photoURL} alt="avatar" />}
      {!photoURL && displayName && <span>{displayName.charAt(0)}</span>}
    </div>
  )
}

Avatar.propTypes = {
  displayName: PropTypes.string,
  photoURL: PropTypes.string,
  className: PropTypes.string,
}

Avatar.defaultProps = {
  displayName: undefined,
  photoURL: undefined,
  className: undefined,
}

export default Avatar
