import React from 'react'
import { useNavigate } from 'react-router-dom'

import TalkForm from './talkForm'
import { useCreateTalk } from '../../../data/talk'

const TalkCreate = () => {
  const navigate = useNavigate()
  const { mutateAsync } = useCreateTalk()

  const onSubmit = (data) => {
    return mutateAsync(data, {
      onSuccess: (talkCreated) => {
        navigate(`/speaker/talk/${talkCreated.id}`)
      },
    })
  }

  return <TalkForm onSubmit={onSubmit} />
}

export default TalkCreate
