import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@k-redux-router/react-k-ramel'

const SideBarLink = ({ children, code, ...rest }) => (
  <Link
    code={code}
    className="sidebar-link"
    activeProps={{ className: 'sidebar-link sidebar-link-active' }}
    {...rest}
  >
    {children}
  </Link>
)

SideBarLink.propTypes = {
  children: PropTypes.node.isRequired,
  code: PropTypes.string.isRequired,
}

export default SideBarLink
