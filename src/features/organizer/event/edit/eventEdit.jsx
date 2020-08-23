import React from 'react'
import PropTypes from 'prop-types'

import HasRole from 'screens/components/hasRole'
import { ROLE_OWNER_OR_MEMBER } from 'firebase/constants'

import Tabs from './eventTabs'
import EventForm from './eventForm'
import CustomizeForm from './customize'
import CfpForm from './cfp'
import SurveyForm from './survey'
import DeliberationForm from './deliberation'
import IntegrationsForm from './integrations'

const EventEdit = ({ eventId }) => (
  <div>
    <HasRole of={ROLE_OWNER_OR_MEMBER} forEventId={eventId}>
      <Tabs eventId={eventId} />
      <EventForm eventId={eventId} />
      <CustomizeForm eventId={eventId} />
      <CfpForm eventId={eventId} />
      <SurveyForm eventId={eventId} />
      <DeliberationForm eventId={eventId} />
      <IntegrationsForm eventId={eventId} />
    </HasRole>
  </div>
)

EventEdit.propTypes = {
  eventId: PropTypes.string.isRequired,
}

export default EventEdit
