import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import IconLink from 'components/iconLink'

import AvatarDropdown from './avatarDropdown'

import './navbar.css'

const Navbar = ({ name, className }) => (
  <nav className={cn('navbar', className)}>
    <div className="navbar-left">{name}</div>
    <div className="navbar-right">
      <IconLink
        icon="fa fa-github"
        label="report a bug"
        className="navbar-link"
        href="https://github.com/bpetetot/conference-hall/issues/new"
      />
      <AvatarDropdown />
    </div>
  </nav>
)

Navbar.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
}

Navbar.defaultProps = {
  name: undefined,
  className: undefined,
}

export default Navbar
