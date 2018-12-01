import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import { toDate } from 'helpers/firebase'
import { lgf, mdf } from 'helpers/date'
import IconLabel from 'components/iconLabel'
import isEqual from 'date-fns/is_equal'

import './eventDates.css'

const EventDates = ({ dates: { start, end }, large, className }) => {
  if (!start && !end) return null
  const startDate = toDate(start)
  const endDate = toDate(end)
  return (
    <IconLabel
      icon={cn('fa fa-calendar', { 'fa-2x': large })}
      className={className}
      label={
        isEqual(startDate, endDate) ? (
          <span>{lgf(startDate)}</span>
        ) : (
          <span className="dates-block-range">
            {mdf(startDate)} <i className="fa fa-caret-right" /> {mdf(endDate)}
          </span>
        )
      }
    />
  )
}

EventDates.propTypes = {
  dates: PropTypes.objectOf(PropTypes.any),
  large: PropTypes.bool,
  className: PropTypes.string,
}

EventDates.defaultProps = {
  dates: {},
  large: false,
  className: undefined,
}

export default EventDates
