import React from 'react'
import { Link } from 'redux-little-router'
import IconLabel from '../../../components/iconLabel'

import './home.css'

const Home = () => (
  <div className="organizer-home">
    <h1>Home</h1>
    <Link href="/organizer/event/create" className="btn btn-link">
      <IconLabel icon="fa fa-calendar-plus-o" label="Create event" />
    </Link>
  </div>
)

export default Home
