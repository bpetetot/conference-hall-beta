import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import { formatDate } from 'helpers/date'
import IconLabel from 'components/iconLabel'
import isEqual from 'date-fns/isEqual'

import './eventDates.css'

const EventDates = ({ startDate, endDate, timezone, large, className }) => {
  if (!startDate && !endDate) return null
  return (
    <IconLabel
      icon={cn('fa fa-calendar', { 'fa-2x': large })}
      className={className}
      label={
        isEqual(startDate, endDate) ? (
          <span>{formatDate(startDate, 'medium', timezone)}</span>
        ) : (
          <span className="dates-block-range">
            <b>From</b> {formatDate(startDate, large ? 'medium' : 'small', timezone)}&nbsp;
            {large && <br />}
            <b>To</b> {formatDate(endDate, large ? 'medium' : 'small', timezone)}
          </span>
        )
      }
    />
  )
}

EventDates.propTypes = {
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  large: PropTypes.bool,
  timezone: PropTypes.string,
  className: PropTypes.string,
}

EventDates.defaultProps = {
  startDate: undefined,
  endDate: undefined,
  large: false,
  className: undefined,
  timezone: 'Europe/Paris',
}

export default EventDates
