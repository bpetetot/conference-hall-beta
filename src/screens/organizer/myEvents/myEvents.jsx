import React from 'react'
import { Link } from 'redux-little-router'

import IconLabel from 'components/iconLabel'
import './myEvents.css'

const Home = () => (
  <div className="organizer-events">
    <Link href="/organizer/event/create" className="btn btn-link">
      <IconLabel icon="fa fa-calendar-plus-o" label="Create event" />
    </Link>
  </div>
)

export default Home
