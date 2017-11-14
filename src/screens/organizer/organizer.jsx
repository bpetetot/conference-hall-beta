import React from 'react'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import forRoute from 'hoc-little-router'

import { protect } from 'redux/auth'
import { withSizes } from 'styles/utils'
import Brand from './brand'
import Navbar from './navbar'
import Sidebar from './sidebar'
import Home from './home'
import Event from './event'
import { CreateEventForm } from './event/form'

import './organizer.css'

const Organizer = ({ isMobile }) => (
  <div className="layout-screen">
    <Brand className="layout-brand" />
    {!isMobile && <Navbar className="layout-navbar" />}
    {!isMobile && <Sidebar className="layout-sidebar" />}
    <div className="layout-main">
      {isMobile && <Sidebar />}
      <CreateEventForm />
      <Event />
      <Home />
    </div>
  </div>
)

Organizer.propTypes = {
  isMobile: PropTypes.bool,
}

Organizer.defaultProps = {
  isMobile: false,
}

export default compose(forRoute('ORGANIZER'), protect, withSizes)(Organizer)
