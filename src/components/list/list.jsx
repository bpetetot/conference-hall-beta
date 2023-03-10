import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import isEmpty from 'lodash/isEmpty'

import './list.css'

function List({ array, className, noResult, renderRow }) {
  return (
    <div className={cn('list', className)}>
      {isEmpty(array) ? <div className="no-result">{noResult}</div> : array.map(renderRow)}
    </div>
  )
}

List.propTypes = {
  array: PropTypes.arrayOf(PropTypes.any),
  className: PropTypes.string,
  noResult: PropTypes.node,
  renderRow: PropTypes.func.isRequired,
}

List.defaultProps = {
  array: [],
  noResult: 'No result',
  className: undefined,
}

export default List
