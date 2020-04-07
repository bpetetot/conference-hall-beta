import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import isEmpty from 'lodash/isEmpty'

import Submission from './submission'
import './submissions.css'

const TalkSubmissions = ({ id, submissions, className }) => (
  <div className={cn('card', className)}>
    <h3>Submissions</h3>
    {isEmpty(submissions) && <small>Not submitted yet</small>}
    {!isEmpty(submissions) && (
      <div className="talk-submissions">
        {Object.keys(submissions).map((eventId) => (
          <Submission key={eventId} eventId={eventId} talkId={id} />
        ))}
      </div>
    )}
  </div>
)

TalkSubmissions.propTypes = {
  id: PropTypes.string.isRequired,
  submissions: PropTypes.objectOf(PropTypes.any),
  className: PropTypes.string,
}

TalkSubmissions.defaultProps = {
  submissions: {},
  className: undefined,
}

export default TalkSubmissions
