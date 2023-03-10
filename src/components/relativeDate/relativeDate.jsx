import React from 'react'
import PropTypes from 'prop-types'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import IconLabel from '../iconLabel'

function RelativeDate({ date }) {
  if (!date) return null
  return <IconLabel icon="fa fa-clock-o" label={formatDistanceToNow(date, { addSuffix: true })} />
}

RelativeDate.propTypes = {
  date: PropTypes.instanceOf(Date),
}

RelativeDate.defaultProps = {
  date: undefined,
}

export default RelativeDate
