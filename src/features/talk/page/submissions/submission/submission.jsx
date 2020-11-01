/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import TalkStatus from 'features/talk/components/status'
import './submission.css'

const Submission = ({ talk, eventId, name }) => {
  return (
    <div className="talk-submission-event">
      <Link to={`/speaker/event/${eventId}/submissions/${talk.id}`}>{name}</Link>
      <div className="talk-submission-event-actions">
        <TalkStatus talk={talk} eventId={eventId} displayCfpStatus={false} />
      </div>
    </div>
  )
}

Submission.propTypes = {
  talk: PropTypes.any.isRequired,
  eventId: PropTypes.string.isRequired,
  name: PropTypes.string,
}

Submission.defaultProps = {
  name: undefined,
}

export default Submission
