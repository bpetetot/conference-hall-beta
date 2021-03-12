import React from 'react'
import { useParams } from 'react-router-dom'
import SubmissionPage from './submissionPage.container'

function TalkSubmitted(props) {
  const { talkId } = useParams()

  return <SubmissionPage talkId={talkId} {...props} />
}

export default TalkSubmitted
