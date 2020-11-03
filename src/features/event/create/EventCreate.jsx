import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import eventCrud from 'firebase/events'

import { useAuth } from 'features/auth'
import EventForm from '../form'

const EventCreate = () => {
  const { user } = useAuth()
  const { uid } = user

  const navigate = useNavigate()
  const onSubmit = useCallback(
    async (data) => {
      const event = {
        ...data,
        owner: uid,
        visibility: data.visibility ? 'private' : 'public',
      }
      const ref = await eventCrud.create(event)

      navigate(`/organizer/event/${ref.id}`)
    },
    [navigate, uid],
  )

  return <EventForm onSubmit={onSubmit} />
}

export default EventCreate
