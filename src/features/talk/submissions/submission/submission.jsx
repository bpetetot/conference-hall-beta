/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { useTalk } from 'features/talk/useTalks'
import TalkStatus from 'features/talk/status'
import './submission.css'

const Submission = ({ talkId, eventId, name }) => {
  const { data: talk, isLoading } = useTalk(talkId)

  if (isLoading) return null

  return (
    <div className="talk-submission-event">
      <Link to={`/speaker/event/${eventId}/submissions/${talkId}`}>{name}</Link>
      <div className="talk-submission-event-actions">
        <TalkStatus talk={talk} eventId={eventId} displayCfpStatus={false} />
      </div>
    </div>
  )
}

Submission.propTypes = {
  talkId: PropTypes.string.isRequired,
  eventId: PropTypes.string.isRequired,
  name: PropTypes.string,
}

Submission.defaultProps = {
  name: undefined,
}

export default Submission
