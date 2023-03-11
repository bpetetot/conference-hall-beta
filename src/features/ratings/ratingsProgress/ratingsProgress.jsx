import React from 'react'
import PropTypes from 'prop-types'

import styles from './ratingsProgress.module.css'

function RatingsProgress({ rated, total }) {
  if (total === 0) return null
  return (
    <div className={styles.wrapper}>
      <div>{`${rated} / ${total} proposals reviewed`}</div>
      <progress id="file" max={total} value={rated} />
    </div>
  )
}

RatingsProgress.propTypes = {
  rated: PropTypes.number,
  total: PropTypes.number,
}

RatingsProgress.defaultProps = {
  rated: 0,
  total: 0,
}

export default RatingsProgress
