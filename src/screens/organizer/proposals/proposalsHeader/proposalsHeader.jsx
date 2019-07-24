import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Titlebar from 'components/titlebar'
import RatingsProgress from 'screens/organizer/components/ratingsProgress'

import styles from './proposalsHeader.module.css'

const ProposalsHeader = ({ eventId, title }) => (
  <div className={styles.header}>
    <Titlebar
      icon="fa fa-paper-plane"
      title={title}
      className={classnames(styles.title, 'no-print')}
    />
    <RatingsProgress eventId={eventId} />
  </div>
)

ProposalsHeader.propTypes = {
  eventId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default ProposalsHeader
