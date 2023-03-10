import React from 'react'
import PropTypes from 'prop-types'
import { Route, Routes } from 'react-router-dom'

import HasRole from 'features/organization/hasRole'
import { ROLE_OWNER_OR_MEMBER } from 'firebase/constants'

import Tabs from 'features/event/edit/eventTabs'
import EventForm from 'features/event/edit/eventForm'
import CustomizeForm from 'features/event/edit/customize'
import CfpForm from 'features/event/edit/cfp'
import SurveyForm from 'features/event/edit/survey'
import DeliberationForm from 'features/event/edit/deliberation'
import IntegrationsForm from 'features/event/edit/integrations'

function EventEdit({ eventId }) {
  return (
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
}

EventEdit.propTypes = {
  eventId: PropTypes.string.isRequired,
}

export default EventEdit
