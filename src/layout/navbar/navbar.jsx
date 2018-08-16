import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import AvatarDropdown from './avatarDropdown'

import './navbar.css'

const Navbar = ({ className }) => (
  <nav className={cn('navbar', className)}>
    <AvatarDropdown />
  </nav>
)

Navbar.propTypes = {
  className: PropTypes.string,
}

Navbar.defaultProps = {
  className: undefined,
}

export default Navbar
