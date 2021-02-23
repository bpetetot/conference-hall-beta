import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { useCreateEvent } from '../../../data/event'
import EventForm from '../form'

const EventCreate = () => {
  const navigate = useNavigate()

  const { mutateAsync } = useCreateEvent()

  const onSubmit = useCallback(
    async (data) => {
      return mutateAsync(data, {
        onSuccess: (eventCreated) => {
          navigate(`/organizer/event/${eventCreated.id}`)
        },
      })
    },
    [navigate, mutateAsync],
  )

  const initialValues = {
    type: 'CONFERENCE',
    visibility: 'PUBLIC',
  }

  return <EventForm initialValues={initialValues} isCreateForm onSubmit={onSubmit} />
}

export default EventCreate
