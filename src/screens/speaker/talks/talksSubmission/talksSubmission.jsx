import React from 'react'
import PropTypes from 'prop-types'

import Titlebar from 'components/titlebar'
import TalksSubmissionTable from './talksSubmissionTable.container'

import './talksSubmission.css'

const TalksSubmission = ({ name }) => (
  <div className="talks-submission">
    <Titlebar
      icon="fa fa-paper-plane"
      title={
        <span>
          Select a talk to submit to <span className="event-subtitle">{name}</span>
        </span>
      }
    />
    <TalksSubmissionTable />
  </div>
)

TalksSubmission.propTypes = {
  name: PropTypes.string,
}

TalksSubmission.defaultProps = {
  name: '...',
}

export default TalksSubmission
