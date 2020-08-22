import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { Link, useMatch } from 'react-router-dom'

const SideBarLink = ({ children, to, exact }) => {
  const match = useMatch({ path: to, end: exact })

  return (
    <Link to={to} className={cn('sidebar-link', { 'sidebar-link-active': match })}>
      {children}
    </Link>
  )
}

SideBarLink.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
  exact: PropTypes.bool,
}

SideBarLink.defaultProps = {
  exact: false,
}

export default SideBarLink
