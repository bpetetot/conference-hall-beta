import React from 'react'
import PropTypes from 'prop-types'

import Status from '../../status'
import './submission.css'

const Submission = ({
  talkId, eventId, name, onClickEdit, onClickEvent,
}) => (
  <div className="talk-submission-event">
    <a onClick={onClickEvent} role="button">
      {name}
    </a>
    <div className="talk-submission-event-actions">
      <Status talkId={talkId} eventId={eventId} />
      <a onClick={onClickEdit} role="button">
        <i className="fa fa-pencil" />
      </a>
    </div>
  </div>
)

Submission.propTypes = {
  talkId: PropTypes.string.isRequired,
  eventId: PropTypes.string.isRequired,
  name: PropTypes.string,
  onClickEdit: PropTypes.func.isRequired,
  onClickEvent: PropTypes.func.isRequired,
}

Submission.defaultProps = {
  name: undefined,
}

export default Submission
