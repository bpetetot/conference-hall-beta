import React from 'react'
import PropTypes from 'prop-types'

import './submissionTitle.css'

const SubmissionTitle = ({ eventName }) => (
  <h1>
    <span className="submission-subtitle">{eventName}</span> • Call for paper
  </h1>
)

SubmissionTitle.propTypes = {
  eventName: PropTypes.string.isRequired,
}

export default SubmissionTitle
