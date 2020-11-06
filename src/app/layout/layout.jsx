import React, { memo } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Brand from './brand'
import Navbar from './navbar'

import './layout.css'

const AppLayout = ({ children, sidebar }) => {
  return (
    <div className={cn('layout-screen', { 'layout-screen-full-width': !sidebar })}>
      <Brand className="layout-brand" sidebar={sidebar} />
      <Navbar className="layout-navbar" />
      {sidebar && <div className="layout-sidebar">{sidebar}</div>}
      <div className="layout-main">{children}</div>
    </div>
  )
}

AppLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]).isRequired,
  sidebar: PropTypes.node,
}

AppLayout.defaultProps = {
  sidebar: null,
}

export default memo(AppLayout)
