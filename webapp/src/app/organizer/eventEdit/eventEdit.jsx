import React from 'react'
import PropTypes from 'prop-types'
import { Route, Routes } from 'react-router-dom'

import HasRole from 'features/organization/hasRole'
import { ROLE_OWNER_OR_MEMBER } from 'features/organization/constants'

import Tabs from 'features/event/edit/eventTabs'
import EventForm from 'features/event/edit/EventEdit'
import CustomizeForm from 'features/event/edit/customize'
import CfpForm from 'features/event/edit/cfp'
import SurveyForm from 'features/event/edit/survey'
import DeliberationForm from 'features/event/edit/deliberation'
import IntegrationsForm from 'features/event/edit/integrations'

const EventEdit = ({ event }) => {
  return (
    <div>
      <HasRole of={ROLE_OWNER_OR_MEMBER} forEvent={event}>
        <Tabs eventId={event.id} />
        <Routes>
          <Route path="/" element={<EventForm event={event} />} />
          <Route path="cfp" element={<CfpForm event={event} />} />
          <Route path="deliberation" element={<DeliberationForm event={event} />} />
          <Route path="custom" element={<CustomizeForm event={event} />} />
          <Route path="survey" element={<SurveyForm event={event} />} />
          <Route path="integrations" element={<IntegrationsForm event={event} />} />
        </Routes>
      </HasRole>
    </div>
  )
}

EventEdit.propTypes = {
  event: PropTypes.object.isRequired,
}

export default EventEdit
