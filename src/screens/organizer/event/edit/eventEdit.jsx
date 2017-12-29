import React, { Fragment } from 'react'

import Tabs from './eventTabs'
import EventForm from './eventForm'
import CfpForm from './cfp'

const EventEdit = () => (
  <Fragment>
    <Tabs />
    <EventForm />
    <CfpForm />
  </Fragment>
)

export default EventEdit
