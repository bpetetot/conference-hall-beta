import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import talkCrud from 'firebase/talks'

import { useAuth } from 'features/auth'
import TalkForm from './talkForm'

function TalkCreate() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const { uid } = user
  const onSubmit = useCallback(
    async (data) => {
      const ref = await talkCrud.create({
        ...data,
        owner: uid,
        archived: false,
        speakers: { [uid]: true },
      })

      navigate(`/speaker/talk/${ref.id}`)
    },
    [navigate, uid],
  )

  return <TalkForm onSubmit={onSubmit} />
}

export default TalkCreate
