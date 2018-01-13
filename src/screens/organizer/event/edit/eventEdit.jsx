import React from 'react'
import PropTypes from 'prop-types'

import Tabs from './eventTabs'
import EventForm from './eventForm'
import CfpForm from './cfp'

const EventEdit = ({ eventId }) => (
  <div>
    <Tabs eventId={eventId} />
    <EventForm eventId={eventId} />
    <CfpForm eventId={eventId} />
  </div>
)

EventEdit.propTypes = {
  eventId: PropTypes.string.isRequired,
}

export default EventEdit
