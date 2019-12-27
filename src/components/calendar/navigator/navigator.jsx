import React from 'react'
import PropTypes from 'prop-types'
import format from 'date-fns/format'
import addMonths from 'date-fns/addMonths'
import addDays from 'date-fns/addDays'
import Button from 'components/button'

import styles from './navigator.module.css'

const Navigator = ({ date, type, onChangeDate }) => {
  const add = type === 'day' ? addDays : addMonths
  const dateFormat = type === 'day' ? 'dd MMMM yyyy' : 'MMMM yyyy'

  const goToPreviousMonth = () => onChangeDate(add(date, -1))
  const gotToNextMonth = () => onChangeDate(add(date, 1))
  const goToToday = () => onChangeDate(new Date())

  return (
    <div className={styles.header}>
      <span className={styles.title}>{format(date, dateFormat)}</span>
      <div className={styles.buttons}>
        <Button secondary onClick={goToPreviousMonth}>
          <i className="fa fa-chevron-left" />
        </Button>
        <Button secondary onClick={goToToday}>
          Today
        </Button>
        <Button secondary onClick={gotToNextMonth}>
          <i className="fa fa-chevron-right" />
        </Button>
      </div>
    </div>
  )
}

Navigator.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  onChangeDate: PropTypes.func.isRequired,
  type: PropTypes.oneOf('day', 'month').isRequired,
}

export default Navigator
