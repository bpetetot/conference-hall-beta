import React from 'react'
import PropTypes from 'prop-types'

import { toDate } from 'helpers/firebase'
import { lgf, mdf } from 'helpers/date'
import IconLabel from 'components/iconLabel'
import isEqual from 'date-fns/is_equal'

import './datesBlock.css'

const DatesBlock = ({ dates: { start, end }, className }) => {
  if (!start && !end) return null
  const startDate = toDate(start)
  const endDate = toDate(end)
  return (
    <IconLabel
      icon="fa fa-calendar fa-2x"
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

DatesBlock.propTypes = {
  dates: PropTypes.objectOf(PropTypes.any),
  className: PropTypes.string,
}

DatesBlock.defaultProps = {
  dates: {},
  className: undefined,
}

export default DatesBlock
