import React from 'react'
import PropTypes from 'prop-types'
import Link from 'components/link'

const SideBarLink = ({ children, code, ...rest }) => (
  <Link code={code} className="sidebar-link" classNameActive="sidebar-link-active" {...rest}>
    {children}
  </Link>
)

SideBarLink.propTypes = {
  children: PropTypes.node.isRequired,
  code: PropTypes.string.isRequired,
}

export default SideBarLink
