import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'redux-little-router'

const SideBarLink = ({ children, to }) => (
  <Link
    href={to}
    className="sidebar-link"
    activeProps={{ className: 'sidebar-link sidebar-link-active' }}
  >
    {children}
  </Link>
)

SideBarLink.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
}

export default SideBarLink
