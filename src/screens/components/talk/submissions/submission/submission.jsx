/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@k-redux-router/react-k-ramel'

import Status from '../../status'
import './submission.css'

const Submission = ({ talkId, eventId, name }) => (
  <div className="talk-submission-event">
    <Link code="speaker-event-submission-page" eventId={eventId} talkId={talkId}>
      {name}
    </Link>
    <div className="talk-submission-event-actions">
      <Status talkId={talkId} eventId={eventId} />
    </div>
  </div>
)

Submission.propTypes = {
  talkId: PropTypes.string.isRequired,
  eventId: PropTypes.string.isRequired,
  name: PropTypes.string,
}

Submission.defaultProps = {
  name: undefined,
}

export default Submission
