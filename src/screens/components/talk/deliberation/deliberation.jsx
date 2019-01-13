import React from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import Notification from './notification'

import styles from './deliberation.module.css'

const filterAccepted = submissions => Object.keys(submissions).filter(eventId => submissions[eventId].state === 'accepted')

const TalkDeliberationNotification = ({ submissions }) => {
  const acceptedSubmission = filterAccepted(submissions)

  if (isEmpty(acceptedSubmission)) {
    return null
  }

  return (
    <div className={styles.deliberation}>
      {acceptedSubmission.map(eventId => (
        <Notification key={eventId} eventId={eventId} talkId={submissions[eventId].id} />
      ))}
    </div>
  )
}

TalkDeliberationNotification.propTypes = {
  submissions: PropTypes.object.isRequired,
}

export default TalkDeliberationNotification
