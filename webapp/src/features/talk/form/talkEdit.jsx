import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import TalkForm from './talkForm'
import { useTalk, useUpdateTalk } from '../../../data/talk'

const TalkEdit = () => {
  const navigate = useNavigate()
  const { talkId } = useParams()
  const { data: talk, isLoading } = useTalk(talkId)
  const { mutateAsync } = useUpdateTalk(talkId)

  const onSubmit = (data) =>
    mutateAsync(data, {
      onSuccess: () => {
        navigate(`/speaker/talk/${talkId}`)
      },
    })

  if (isLoading) {
    return <div>Loading...</div>
  }

  return <TalkForm initialValues={talk} onSubmit={onSubmit} />
}

export default TalkEdit
