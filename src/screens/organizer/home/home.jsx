import React from 'react'
import { Link } from 'redux-little-router'

import IconLabel from 'components/iconLabel'
import './home.css'

const Home = ({ toast }) => (
  <div className="organizer-home">
    <Link href="/organizer/event/create" className="btn btn-link">
      <IconLabel icon="fa fa-calendar-plus-o" label="Create event" />
    </Link>
    <button className="btn btn-primary" onClick={() => toast(Date.now())}>
      Toast
    </button>
  </div>
)

export default Home
