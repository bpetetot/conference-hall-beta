import React from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import Notification from './notification.container'

const filterAccepted = submissions => Object.keys(submissions).filter(eventId => submissions[eventId].state === 'accepted')

const TalkDeliberationNotification = ({ submissions }) => {
  const acceptedSubmission = filterAccepted(submissions)
  return (
    <div>
      {isEmpty(acceptedSubmission) && <div /> }
      {!isEmpty(acceptedSubmission) && (
        <div>
          {acceptedSubmission.map(eventId => (
            <Notification key={eventId} eventId={eventId} submission={submissions[eventId]} />
          ))}
        </div>
      )}
    </div>
  )
}

TalkDeliberationNotification.propTypes = {
  submissions: PropTypes.object.isRequired,
}

export default TalkDeliberationNotification
