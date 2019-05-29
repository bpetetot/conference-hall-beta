import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Navbar from './navbar'

import './layout.css'

const AppLayout = ({ children, sidebar }) => (
  <div className={cn('layout-screen', { 'layout-screen-full-width': !sidebar })}>
    <Navbar className="layout-navbar" sidebar={sidebar} withSearchInput />
    {sidebar && <div className="layout-sidebar">{sidebar}</div>}
    <div className={cn('layout-main', { 'layout-main-full-width': !sidebar })}>
      {children}
    </div>
  </div>
)

AppLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]).isRequired,
  sidebar: PropTypes.node,
}

AppLayout.defaultProps = {
  sidebar: null,
}

export default AppLayout
