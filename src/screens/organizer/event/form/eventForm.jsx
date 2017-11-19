import React from 'react'

import EventTabs from './eventTabs'
import { EditEventForm } from './main'
import CFPForm from './cfp'

const EventForm = () => (
  <div>
    <EventTabs />
    <EditEventForm />
    <CFPForm />
  </div>
)

export default EventForm
