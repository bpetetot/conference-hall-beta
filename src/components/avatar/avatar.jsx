/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import './avatar.css'

const Avatar = ({ fullname, image, className }) => (
  <div className={cn('avatar', { 'avatar-initials': !image, 'avatar-image': image }, className)}>
    {image ? <img src={image} alt="user's avatar" /> : <span>{fullname}</span>}
  </div>
)

Avatar.propTypes = {
  fullname: PropTypes.string.isRequired,
  image: PropTypes.string,
  className: PropTypes.string,
}

Avatar.defaultProps = {
  image: undefined,
  className: undefined,
}

export default Avatar
