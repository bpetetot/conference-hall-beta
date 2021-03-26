import React from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import Notification from './notification'

import styles from './deliberation.module.css'

const filterAccepted = (proposals) => proposals.filter((proposal) => proposal.status === 'ACCEPTED')

const TalkDeliberationNotification = ({ proposals }) => {
  const acceptedProposals = filterAccepted(proposals)

  if (isEmpty(acceptedProposals)) {
    return null
  }

  return (
    <div className={styles.deliberation}>
      {acceptedProposals.map((proposal) => (
        <Notification key={proposal.eventId} proposal={proposal} />
      ))}
    </div>
  )
}

TalkDeliberationNotification.propTypes = {
  proposals: PropTypes.array.isRequired,
}

export default TalkDeliberationNotification
