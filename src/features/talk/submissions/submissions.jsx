import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import isEmpty from 'lodash/isEmpty'

import Submission from './submission'
import './submissions.css'

const TalkSubmissions = ({ id, proposals, className }) => (
  <div className={cn('card', className)}>
    <h3>Submissions</h3>
    {isEmpty(proposals) && <small>Not submitted yet</small>}
    {!isEmpty(proposals) && (
      <div className="talk-submissions">
        {proposals.map(({ eventId, status }) => (
          <Submission key={eventId} eventId={eventId} talkId={id} status={status} />
        ))}
      </div>
    )}
  </div>
)

TalkSubmissions.propTypes = {
  id: PropTypes.number.isRequired,
  proposals: PropTypes.array,
  className: PropTypes.string,
}

TalkSubmissions.defaultProps = {
  proposals: [],
  className: undefined,
}

export default TalkSubmissions
