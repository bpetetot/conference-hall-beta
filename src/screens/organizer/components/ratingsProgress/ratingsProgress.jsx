import React from 'react'
import PropTypes from 'prop-types'

import styles from './ratingsProgress.module.css'

const RatingsProgress = ({ deliberationActive, rated, total }) => {
  if (!deliberationActive) return null
  if (total === 0) return null
  return (
    <div className={styles.wrapper}>
      <div>{`${rated} / ${total} proposals reviewed`}</div>
      <progress id="file" max={total} value={rated} />
    </div>
  )
}

RatingsProgress.propTypes = {
  deliberationActive: PropTypes.bool,
  rated: PropTypes.number,
  total: PropTypes.number,
}

RatingsProgress.defaultProps = {
  deliberationActive: false,
  rated: 0,
  total: 0,
}

export default RatingsProgress
