import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import AvatarDropdown from './avatarDropdown'

import './navbar.css'

const SpeakerNavbar = ({ className }) => (
  <nav className={cn('navbar', className)}>
    <AvatarDropdown />
  </nav>
)

SpeakerNavbar.propTypes = {
  className: PropTypes.string,
}

SpeakerNavbar.defaultProps = {
  className: undefined,
}

export default SpeakerNavbar
