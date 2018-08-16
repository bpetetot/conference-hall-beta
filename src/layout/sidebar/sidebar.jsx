import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import './sidebar.css'

const SideBar = ({ className, children }) => (
  <div className={cn('sidebar', className)}>{children}</div>
)

SideBar.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
}

SideBar.defaultProps = {
  className: undefined,
}

export default SideBar
