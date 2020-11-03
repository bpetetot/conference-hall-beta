import React from 'react'
import { Route, Routes } from 'react-router-dom'

import HasRole from 'features/organization/hasRole'
import { ROLE_OWNER_OR_MEMBER } from 'firebase/constants'

import { LoadingIndicator } from 'components/loader'
import Tabs from 'features/event/edit/eventTabs'
import EventForm from 'features/event/edit/eventForm'
import CustomizeForm from 'features/event/edit/customize'
import CfpForm from 'features/event/edit/cfp'
import SurveyForm from 'features/event/edit/survey'
import DeliberationForm from 'features/event/edit/deliberation'
import IntegrationsForm from 'features/event/edit/integrations'
import { useCurrentEvent } from '../currentEventContext'

const EventEdit = () => {
  const { data: event, isLoading } = useCurrentEvent()

  if (isLoading) return <LoadingIndicator />

  return (
    <div>
      <HasRole of={ROLE_OWNER_OR_MEMBER} forEventId={event.id}>
        <Tabs eventId={event.id} />
        <Routes>
          <Route path="/" element={<EventForm />} />
          <Route path="cfp" element={<CfpForm />} />
          <Route path="deliberation" element={<DeliberationForm eventId={event.id} />} />
          <Route path="custom" element={<CustomizeForm eventId={event.id} />} />
          <Route path="survey" element={<SurveyForm eventId={event.id} />} />
          <Route path="integrations" element={<IntegrationsForm eventId={event.id} />} />
        </Routes>
      </HasRole>
    </div>
  )
}

export default EventEdit
