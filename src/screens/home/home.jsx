import React from 'react'
import { Link } from 'redux-little-router'
import forRoute from 'hoc-little-router'

import './home.css'

const Home = () => (
  <div className="home">
    <Link href="/organizer" className="home-link">
      <i className="fa fa-rocket" />
      <span>I&apos;m an organizer</span>
    </Link>
  </div>
)

export default forRoute('HOME', { absolute: true })(Home)
