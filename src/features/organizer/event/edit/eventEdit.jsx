import React from 'react'
import PropTypes from 'prop-types'
import { Route, Routes } from 'react-router-dom'

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
      <Routes>
        <Route path="/" element={<EventForm eventId={eventId} />} />
        <Route path="cfp" element={<CfpForm eventId={eventId} />} />
        <Route path="deliberation" element={<DeliberationForm eventId={eventId} />} />
        <Route path="custom" element={<CustomizeForm eventId={eventId} />} />
        <Route path="survey" element={<SurveyForm eventId={eventId} />} />
        <Route path="integrations" element={<IntegrationsForm eventId={eventId} />} />
      </Routes>
    </HasRole>
  </div>
)

EventEdit.propTypes = {
  eventId: PropTypes.string.isRequired,
}

export default EventEdit
