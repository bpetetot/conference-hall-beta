import React from 'react'
import PropTypes from 'prop-types'

import Titlebar from 'components/titlebar'
import RatingsProgress from 'screens/organizer/components/ratingsProgress'

import styles from './proposalsHeader.module.css'

const ProposalsHeader = ({ title }) => (
  <div className={styles.header}>
    <Titlebar icon="fa fa-paper-plane" title={title} className="no-print" />
    <RatingsProgress />
  </div>
)

ProposalsHeader.propTypes = {
  title: PropTypes.string.isRequired,
}

export default ProposalsHeader
