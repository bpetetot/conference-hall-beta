/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Badge from 'components/badge'
import './submission.css'
import { useEvent } from 'data/event'

const Submission = ({ talkId, eventId, status }) => {
  const { data: event } = useEvent(eventId)
  if (!event) return null
  return (
    <div className="talk-submission-event">
      <Link to={`/speaker/event/${eventId}/submissions/${talkId}`}>{event.name}</Link>
      <div className="talk-submission-event-actions">
        <Badge>{status}</Badge>
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
