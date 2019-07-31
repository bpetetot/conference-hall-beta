import React from 'react'
import PropTypes from 'prop-types'

import Tabs from './eventTabs'
import EventForm from './eventForm'
import CustomizeForm from './customize'
import CfpForm from './cfp'
import SurveyForm from './survey'
import DeliberationForm from './deliberation'
import IntegrationsForm from './integrations'

const EventEdit = ({ eventId }) => (
  <div>
    <Tabs eventId={eventId} />
    <EventForm eventId={eventId} />
    <CustomizeForm eventId={eventId} />
    <CfpForm eventId={eventId} />
    <SurveyForm eventId={eventId} />
    <DeliberationForm eventId={eventId} />
    <IntegrationsForm eventId={eventId} />
  </div>
)

EventEdit.propTypes = {
  eventId: PropTypes.string.isRequired,
}

export default EventEdit
