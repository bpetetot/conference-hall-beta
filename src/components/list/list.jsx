import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import isEmpty from 'lodash/isEmpty'

import './list.css'

const List = ({
  array, className, renderNoResult, renderRow,
}) => {
  if (isEmpty(array)) return renderNoResult()
  return <div className={cn('list', className)}>{array.map(renderRow)}</div>
}

List.propTypes = {
  array: PropTypes.arrayOf(PropTypes.any),
  className: PropTypes.string,
  renderNoResult: PropTypes.func.isRequired,
  renderRow: PropTypes.func.isRequired,
}

List.defaultProps = {
  array: [],
  className: undefined,
}

export default List
