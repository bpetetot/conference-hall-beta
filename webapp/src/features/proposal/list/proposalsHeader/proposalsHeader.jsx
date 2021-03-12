import React from 'react'
import PropTypes from 'prop-types'

import Titlebar from 'components/titlebar'

import styles from './proposalsHeader.module.css'

const ProposalsHeader = ({ result }) => {
  const rated = 0
  return (
    <div className={styles.header}>
      <Titlebar icon="fa fa-paper-plane" title="Proposals" className={styles.title} />
      <div className={styles.ratings}>
        <div>{`${rated} / ${result.total} proposals reviewed`}</div>
        <progress id="file" max={result.total} value={rated} />
      </div>
    </div>
  )
}

ProposalsHeader.propTypes = {
  result: PropTypes.object,
}

ProposalsHeader.defaultProps = {
  result: {},
}

export default ProposalsHeader
