import React from 'react'
import { Link } from 'redux-little-router'
import forRoute from 'hoc-little-router'

import IconLabel from 'components/iconLabel'
import './home.css'

const Home = () => (
  <div className="organizer-home">
    <Link href="/organizer/event/create" className="btn btn-link">
      <IconLabel icon="fa fa-calendar-plus-o" label="Create event" />
    </Link>
  </div>
)

export default forRoute('ORGANIZER', { absolute: true })(Home)
