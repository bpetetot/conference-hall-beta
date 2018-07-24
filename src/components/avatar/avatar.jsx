/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import randomColor from 'randomcolor'

import './avatar.css'

const generateColor = (seed) => {
  if (!seed) return {}
  return {
    background: randomColor({
      seed,
      luminosity: 'bright',
      hsla: 'rgb',
    }),
  }
}

const Avatar = ({
  name, src, color, className, style,
}) => {
  if (!name && !src) return null

  const colors = color ? { background: color } : generateColor(name)
  const classes = cn('avatar', { 'avatar-initials': !src, 'avatar-image': src }, className)

  return (
    <div className={classes} style={{ ...colors, ...style }}>
      {src && <img src={src} alt="avatar" />}
      {!src && name && <span>{name.charAt(0)}</span>}
    </div>
  )
}

Avatar.propTypes = {
  name: PropTypes.string,
  src: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.string),
}

Avatar.defaultProps = {
  name: undefined,
  src: undefined,
  color: undefined,
  className: undefined,
  style: undefined,
}

export default Avatar
