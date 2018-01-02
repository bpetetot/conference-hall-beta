import React from 'react'
import PropTypes from 'prop-types'

import { lgf, mdf } from 'helpers/date'
import IconCard from 'components/iconCard'
import isEqual from 'date-fns/is_equal'

import './datesBlock.css'

const DatesBlock = ({ dates: { start, end }, className }) => {
  if (!start && !end) return null
  return (
    <IconCard icon="fa fa-calendar" className={className}>
      {isEqual(start, end) ? (
        <span>{lgf(start)}</span>
      ) : (
        <span className="dates-block-range">
          {mdf(start)} <i className="fa fa-caret-right" /> {mdf(end)}
        </span>
      )}
    </IconCard>
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
