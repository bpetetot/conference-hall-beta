import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import isEmpty from 'lodash/isEmpty'

import './list.css'

const List = ({
  array, className, noResult, renderRow,
}) => {
  if (isEmpty(array)) return noResult
  return <div className={cn('list', className)}>{array.map(renderRow)}</div>
}

List.propTypes = {
  array: PropTypes.arrayOf(PropTypes.any),
  className: PropTypes.string,
  noResult: PropTypes.node,
  renderRow: PropTypes.func.isRequired,
}

List.defaultProps = {
  array: [],
  noResult: 'No results',
  className: undefined,
}

export default List
