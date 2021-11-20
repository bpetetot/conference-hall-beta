import React, { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useNotification } from 'app/layout/notification/context'
import LoadingIndicator from 'components/loader'
import TalkForm from './talkForm'
import { useTalk, useUpdateTalk } from '../../../data/talk'

const TalkEdit = () => {
  const navigate = useNavigate()
  const { sendError } = useNotification()
  const { talkId } = useParams()
  const { data: talk, isLoading, isError, error } = useTalk(talkId)
  const { mutateAsync } = useUpdateTalk(talkId)

  const initialValues = useMemo(
    () => ({
      title: talk?.title,
      abstract: talk?.abstract,
      language: talk?.languages ? talk.languages[0] : null,
      level: talk?.level,
      references: talk?.references,
    }),
    [talk],
  )

  if (isLoading) {
    return <LoadingIndicator />
  }
  if (isError) {
    return <div>An unexpected error has occurred: {error.message}</div>
  }

  const onSubmit = (data) =>
    mutateAsync(data, {
      onSuccess: () => navigate(`/speaker/talk/${talkId}`),
    }).catch(() => {
      sendError(`An unexpected error has occurred.`)
    })

  return <TalkForm initialValues={initialValues} onSubmit={onSubmit} />
}

export default TalkEdit
