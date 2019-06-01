import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Navbar from './navbar'

import './layout.css'

const AppLayout = ({
  children, className, sidebar, fullwidth,
}) => (
  <div className={cn('layout-screen', { nosidebar: !sidebar })}>
    <Navbar className="layout-navbar" sidebar={sidebar} />
    {sidebar && <div className="layout-sidebar">{sidebar}</div>}
    <div className={cn('layout-main', className, { fullwidth })}>{children}</div>
  </div>
)

AppLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]).isRequired,
  className: PropTypes.string,
  sidebar: PropTypes.node,
  fullwidth: PropTypes.bool,
}

AppLayout.defaultProps = {
  className: undefined,
  sidebar: null,
  fullwidth: false,
}

export default AppLayout
