import React from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'

import Submission from './submission'
import './submissions.css'

const TalkSubmissions = ({ talk }) => (
  <div className="card">
    <h3>Submissions</h3>
    {isEmpty(talk.submissions) && <small>Not submitted yet</small>}
    {!isEmpty(talk.submissions) && (
      <div className="talk-submissions">
        {Object.keys(talk.submissions).map((eventId) => (
          <Submission key={eventId} eventId={eventId} talk={talk} />
        ))}
      </div>
    )}
  </div>
)

TalkSubmissions.propTypes = {
  talk: PropTypes.any,
}

TalkSubmissions.defaultProps = {
  talk: {},
}

export default TalkSubmissions
