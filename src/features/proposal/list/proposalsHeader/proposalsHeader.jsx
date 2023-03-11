import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Titlebar from 'components/titlebar'
import RatingsProgress from 'features/ratings/ratingsProgress'
import { useAuth } from 'features/auth'

import styles from './proposalsHeader.module.css'

function ProposalsHeader({ eventId }) {
  const { user } = useAuth()
  return (
    <div className={styles.header}>
      <Titlebar
        icon="fa fa-paper-plane"
        title="Proposals"
        className={classnames(styles.title, 'no-print')}
      />
      <RatingsProgress eventId={eventId} userId={user.uid} />
    </div>
  )
}

ProposalsHeader.propTypes = {
  eventId: PropTypes.string.isRequired,
}

export default ProposalsHeader
