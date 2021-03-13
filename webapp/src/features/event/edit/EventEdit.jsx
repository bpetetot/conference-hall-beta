import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

import { useNotification } from 'app/layout/notification/context'
import { useUpdateEventField, useUpdateInfoEvent } from '../../../data/event'
import EventForm from '../form'

const EventEdit = ({ event }) => {
  const { sendError } = useNotification()
  const { mutateAsync: updateInfo } = useUpdateInfoEvent(event.id)
  const { mutate: toggleArchive } = useUpdateEventField(event.id, 'archived')

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

  const onUpdateInfo = (data) => {
    return updateInfo(data).catch((error) => {
      sendError(`An unexpected error has occurred: ${error.message}`)
    })
  }

  const onToggleArchive = () => toggleArchive(!event.archived)

  return (
    <EventForm
      initialValues={initialValues}
      onSubmit={onUpdateInfo}
      toggleArchive={onToggleArchive}
    />
  )
}

EventEdit.propTypes = {
  event: PropTypes.object.isRequired,
}

export default EventEdit
