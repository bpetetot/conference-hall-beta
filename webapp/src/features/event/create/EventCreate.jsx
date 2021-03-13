import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useNotification } from 'app/layout/notification/context'

import { useCreateEvent } from '../../../data/event'
import EventForm from '../form'

const EventCreate = () => {
  const navigate = useNavigate()
  const { mutateAsync } = useCreateEvent()
  const { sendError } = useNotification()

  const onSubmit = async (data) => {
    return mutateAsync(data, {
      onSuccess: (event) => navigate(`/organizer/event/${event.id}`),
    }).catch((err) => {
      sendError(`An unexpected error has occurred: ${err.message}`)
    })
  }

  const initialValues = {
    type: 'CONFERENCE',
    visibility: 'PUBLIC',
  }

  return <EventForm initialValues={initialValues} isCreateForm onSubmit={onSubmit} />
}

export default EventCreate
