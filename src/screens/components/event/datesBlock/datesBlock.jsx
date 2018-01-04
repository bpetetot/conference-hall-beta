import React from 'react'
import PropTypes from 'prop-types'

import { lgf, mdf } from 'helpers/date'
import IconLabel from 'components/iconLabel'
import isEqual from 'date-fns/is_equal'

import './datesBlock.css'

const DatesBlock = ({ dates: { start, end }, className }) => {
  if (!start && !end) return null
  return (
    <IconLabel
      icon="fa fa-calendar fa-2x"
      className={className}
      label={
        isEqual(start, end) ? (
          <span>{lgf(start)}</span>
        ) : (
          <span className="dates-block-range">
            {mdf(start)} <i className="fa fa-caret-right" /> {mdf(end)}
          </span>
        )
      }
    />
  )
}

DatesBlock.propTypes = {
  dates: PropTypes.objectOf(PropTypes.instanceOf(Date)),
  className: PropTypes.string,
}

DatesBlock.defaultProps = {
  dates: {},
  className: undefined,
}

export default DatesBlock
