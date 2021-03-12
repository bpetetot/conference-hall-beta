import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

import { useOrganizerEvent, useUpdateInfoEvent } from '../../../data/event'
import EventForm from '../form'

const EventEdit = ({ eventId }) => {
  const { data: event } = useOrganizerEvent(eventId)
  const { mutateAsync } = useUpdateInfoEvent(eventId)

  const initialValues = useMemo(
    () => ({
      ...event,
      address: { address: event.address },
      conferenceDates: {
        start: event.conferenceStart,
        end: event.conferenceEnd,
      },
    }),
    [event],
  )
  return <EventForm initialValues={initialValues} onSubmit={mutateAsync} />
}

EventEdit.propTypes = {
  eventId: PropTypes.string.isRequired,
}

export default EventEdit
