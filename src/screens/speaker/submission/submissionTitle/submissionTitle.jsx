import React from 'react'
import PropTypes from 'prop-types'
import Titlebar from 'components/titlebar'

import './submissionTitle.css'

const SubmissionTitle = ({ eventName }) => (
  <Titlebar
    icon="fa fa-paper-plane"
    title={
      <span>
        Submit to <span className="submission-subtitle">{eventName}</span>
      </span>
    }
  />
)

SubmissionTitle.propTypes = {
  eventName: PropTypes.string.isRequired,
}

export default SubmissionTitle
