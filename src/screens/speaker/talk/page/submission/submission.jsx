import React from 'react'
import PropTypes from 'prop-types'

import Badge from 'components/badge'
import './submission.css'

const Submission = ({
  name, status, onClickEdit, onClickEvent,
}) => (
  <div className="talk-submission-event">
    <a onClick={onClickEvent} role="button">
      {name}
    </a>
    <div className="talk-submission-event-actions">
      <Badge>{status}</Badge>
      <a onClick={onClickEdit} role="button">
        <i className="fa fa-pencil" />
      </a>
    </div>
  </div>
)

Submission.propTypes = {
  name: PropTypes.string,
  status: PropTypes.string,
  onClickEdit: PropTypes.func.isRequired,
  onClickEvent: PropTypes.func.isRequired,
}

Submission.defaultProps = {
  name: undefined,
  status: 'submitted',
}

export default Submission
