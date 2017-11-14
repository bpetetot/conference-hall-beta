import React from 'react'

import { EditEventForm } from './form'
import EventInfo from './info'
import './event.css'

const Event = () => (
  <div className="event">
    <EditEventForm forRoute="/edit" />
    <EventInfo forRoute="/" />
  </div>
)

export default Event
