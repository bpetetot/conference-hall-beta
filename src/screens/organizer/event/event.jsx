import React from 'react'
import { Fragment } from 'redux-little-router'

import { EditEventForm } from './form'
import EventInfo from './info'
import './event.css'

const Event = () => (
  <div className="event">
    <Fragment forRoute="/edit">
      <EditEventForm />
    </Fragment>
    <Fragment forRoute="/">
      <EventInfo />
    </Fragment>
  </div>
)

export default Event
