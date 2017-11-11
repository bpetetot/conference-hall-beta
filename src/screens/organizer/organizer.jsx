import React from 'react'
import PropTypes from 'prop-types'
import { Fragment } from 'redux-little-router'

import { protect } from '../../redux/auth'
import { withSizes } from '../../styles/utils'
import Brand from './brand'
import Navbar from './navbar'
import Sidebar from './sidebar'
import Home from './home'
import Event from './event'

import './organizer.css'

const Organizer = ({ isMobile }) => (
  <div className="layout-screen">
    <Brand className="layout-brand" />
    {!isMobile && <Navbar className="layout-navbar" />}
    {!isMobile && <Sidebar className="layout-sidebar" />}
    <div className="layout-main">
      <Fragment forRoute="/menu" withConditions={() => isMobile}>
        <Sidebar />
      </Fragment>
      <Fragment forRoute="/event">
        <Event />
      </Fragment>
      <Fragment forRoute="/">
        <Home />
      </Fragment>
    </div>
  </div>
)

Organizer.propTypes = {
  isMobile: PropTypes.bool,
}

Organizer.defaultProps = {
  isMobile: false,
}

export default protect(withSizes(Organizer))
