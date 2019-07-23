import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import { toDate } from 'helpers/firebase'
import { formatDate } from 'helpers/date'
import IconLabel from 'components/iconLabel'
import isEqual from 'date-fns/is_equal'

import './eventDates.css'

const EventDates = ({
  dates: { start, end }, timezone, large, className,
}) => {
  if (!start && !end) return null
  const startDate = toDate(start)
  const endDate = toDate(end)
  return (
    <IconLabel
      icon={cn('fa fa-calendar', { 'fa-2x': large })}
      className={className}
      label={
        isEqual(startDate, endDate) ? (
          <span>{formatDate(startDate, 'large', timezone)}</span>
        ) : (
          <span className="dates-block-range">
            {formatDate(startDate, 'medium', timezone)} <i className="fa fa-caret-right" />{' '}
            {formatDate(endDate, 'medium', timezone)}
          </span>
        )
      }
    />
  )
}

EventDates.propTypes = {
  dates: PropTypes.objectOf(PropTypes.any),
  large: PropTypes.bool,
  timezone: PropTypes.string,
  className: PropTypes.string,
}

EventDates.defaultProps = {
  dates: {},
  large: false,
  className: undefined,
  timezone: 'Europe/Paris',
}

export default EventDates
