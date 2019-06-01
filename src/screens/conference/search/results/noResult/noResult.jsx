import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Button from 'components/button'

import styles from './noResult.module.css'

const NoResult = ({ type, resetSearch, className }) => (
  <div className={cn(styles.noResult, className)}>
    <h2>No {type}</h2>
    <p>No {type} found. Try to launch a new search with other keyword or filters.</p>
    <Button onClick={resetSearch}>Reset all filters</Button>
  </div>
)

NoResult.propTypes = {
  type: PropTypes.string.isRequired,
  resetSearch: PropTypes.func.isRequired,
  className: PropTypes.string,
}

NoResult.defaultProps = {
  className: undefined,
}

export default NoResult
