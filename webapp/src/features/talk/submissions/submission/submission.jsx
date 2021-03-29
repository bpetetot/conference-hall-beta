import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { useEvent } from 'data/event'
import TalkStatus from 'features/talk/status/TalkStatus'
import './submission.css'

const Submission = ({ talkId, eventId, status }) => {
  const { data: event } = useEvent(eventId)
  if (!event) return null
  return (
    <div className="talk-submission-event">
      <Link to={`/speaker/event/${eventId}/submissions/${talkId}`}>{event.name}</Link>
      <div className="talk-submission-event-actions">
        <TalkStatus status={status} />
      </div>
    </div>
  )
}

Submission.propTypes = {
  talkId: PropTypes.string.isRequired,
  eventId: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
}

export default Submission
