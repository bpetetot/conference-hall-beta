import React from 'react'
import PropTypes from 'prop-types'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import IconLabel from '../iconLabel'

const RelativeDate = ({ date }) => {
  if (!date) return null
  return <IconLabel icon="fa fa-clock-o" label={distanceInWordsToNow(date, { addSuffix: true })} />
}

RelativeDate.propTypes = {
  date: PropTypes.instanceOf(Date),
}

RelativeDate.defaultProps = {
  date: undefined,
}

export default RelativeDate
