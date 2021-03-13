import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useNotification } from 'app/layout/notification/context'
import TalkForm from './talkForm'
import { useCreateTalk } from '../../../data/talk'

const TalkCreate = () => {
  const navigate = useNavigate()
  const { mutateAsync } = useCreateTalk()
  const { sendError } = useNotification()

  const onSubmit = (data) => {
    return mutateAsync(data, {
      onSuccess: (talk) => navigate(`/speaker/talk/${talk.id}`),
    }).catch((err) => {
      sendError(`An unexpected error has occurred: ${err.message}`)
    })
  }

  return <TalkForm onSubmit={onSubmit} />
}

export default TalkCreate
