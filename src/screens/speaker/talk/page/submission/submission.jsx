import React from 'react'
import PropTypes from 'prop-types'

import Badge from 'components/badge'
import './submission.css'

const Submission = ({ name, onClick, status }) => (
  <div className="talk-submission-event">
    <a onClick={onClick} role="button">
      {name}
    </a>
    <Badge>{status}</Badge>
  </div>
)

Submission.propTypes = {
  name: PropTypes.string,
  status: PropTypes.string,
  onClick: PropTypes.func.isRequired,
}

Submission.defaultProps = {
  name: undefined,
  status: 'submitted',
}

export default Submission
