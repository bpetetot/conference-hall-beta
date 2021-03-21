import React from 'react'
import PropTypes from 'prop-types'

import Titlebar from 'components/titlebar'

import styles from './proposalsHeader.module.css'

const ProposalsHeader = ({ result }) => {
  const { total, totalRated } = result
  return (
    <div className={styles.header}>
      <Titlebar icon="fa fa-paper-plane" title="Proposals" className={styles.title} />
      {!!total && (
        <div className={styles.ratings}>
          <div>{`${totalRated} / ${total} proposals reviewed`}</div>
          <progress value={totalRated} max={total} />
        </div>
      )}
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
