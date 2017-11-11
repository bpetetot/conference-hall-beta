import React from 'react'
import { Fragment } from 'redux-little-router'

import EventEdit from './edit'
import EventInfo from './info'
import './event.css'

const Event = () => (
  <div className="event">
    <Fragment forRoute="/create">
      <EventEdit />
    </Fragment>
    <Fragment forRoute="/:id">
      <EventInfo />
    </Fragment>
  </div>
)

export default Event
