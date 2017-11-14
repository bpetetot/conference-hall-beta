import React from 'react'
import PropTypes from 'prop-types'

import withRoute from 'components/withRoute'
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
      {isMobile && <Sidebar forRoute="/menu" />}
      <CreateEventForm forRoute="/event/create" />
      <Event forRoute="/event/:id" />
      <Home forRoute="/" />
    </div>
  </div>
)

Organizer.propTypes = {
  isMobile: PropTypes.bool,
}

Organizer.defaultProps = {
  isMobile: false,
}

export default withRoute(protect(withSizes(Organizer)))
