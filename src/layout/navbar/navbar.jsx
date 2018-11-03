import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import IconLink from 'components/iconLink'

import AvatarDropdown from './avatarDropdown'

import './navbar.css'

const Navbar = ({ className }) => (
  <nav className={cn('navbar', className)}>
    <IconLink
      icon="fa fa-github"
      label="report a bug"
      className="navbar-link"
      href="https://github.com/bpetetot/conference-hall/issues/new"
    />
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
