/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import './avatar.css'

const Avatar = ({ name, src, className }) => {
  if (!name && !src) return null
  const classes = cn(
    'avatar',
    { 'avatar-initials': !src, 'avatar-image': src },
    className,
  )
  return (
    <div className={classes}>
      {src && <img src={src} alt="avatar" />}
      {!src && name && <span>{name.charAt(0)}</span>}
    </div>
  )
}

Avatar.propTypes = {
  name: PropTypes.string,
  src: PropTypes.string,
  className: PropTypes.string,
}

Avatar.defaultProps = {
  name: undefined,
  src: undefined,
  className: undefined,
}

export default Avatar
