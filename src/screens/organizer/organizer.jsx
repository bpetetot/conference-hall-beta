import React from 'react'

import protect from '../../components/protect'
import Brand from './brand'
import Navbar from './navbar'
import Sidebar from './sidebar'

import './layout.css'

const Organizer = () => (
  <div className="layout-screen">
    <Brand className="layout-brand" />
    <Navbar className="layout-navbar" />
    <Sidebar className="layout-sidebar" />
    <div className="layout-main" />
  </div>
)

export default protect(Organizer)
