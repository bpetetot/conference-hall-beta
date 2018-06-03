import React from 'react'
import PropTypes from 'prop-types'

import Tabs from './eventTabs'
import EventForm from './eventForm'
import CfpForm from './cfp'
import SurveyForm from './survey'
import DeliberationForm from './deliberation'
import ApiForm from './api'

const EventEdit = ({ eventId }) => (
  <div>
    <Tabs eventId={eventId} />
    <EventForm eventId={eventId} />
    <CfpForm eventId={eventId} />
    <SurveyForm eventId={eventId} />
    <DeliberationForm eventId={eventId} />
    <ApiForm eventId={eventId} />
  </div>
)

EventEdit.propTypes = {
  eventId: PropTypes.string.isRequired,
}

export default EventEdit
