/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import TalkStatus from 'features/talk/components/status'
import './submission.css'
import { useEvent } from 'features/event/useEvents'

const Submission = ({ talk, eventId }) => {
  const { data: event, isLoading } = useEvent(eventId)

  if (isLoading) return null

  return (
    <div className="talk-submission-event">
      <Link to={`/speaker/event/${eventId}/submissions/${talk.id}`}>{event?.name}</Link>
      <div className="talk-submission-event-actions">
        <TalkStatus talkId={talk.id} eventId={eventId} displayCfpStatus={false} />
      </div>
    </div>
  )
}

Submission.propTypes = {
  talk: PropTypes.any.isRequired,
  eventId: PropTypes.string.isRequired,
}

export default Submission
