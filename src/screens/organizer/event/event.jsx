import React from 'react'

import { EditEventForm } from './form'
import EventInfo from './info'
import './event.css'

const Event = () => (
  <div className="event">
    <EditEventForm />
    <EventInfo />
  </div>
)

export default Event
