import React from 'react'

import EventTabs from './eventTabs'
import { EditEventForm } from './main'
import CFPForm from './cfp'
import Members from './members'

const EventForm = () => (
  <div>
    <EventTabs />
    <EditEventForm />
    <CFPForm />
    <Members />
  </div>
)

export default EventForm
