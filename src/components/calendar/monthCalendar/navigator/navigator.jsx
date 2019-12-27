import React from 'react'
import PropTypes from 'prop-types'
import format from 'date-fns/format'
import addMonths from 'date-fns/addMonths'
import Button from 'components/button'

import styles from './navigator.module.css'

const Navigator = ({ date, onChangeDate }) => {
  const goToPreviousMonth = () => onChangeDate(addMonths(date, -1))
  const gotToNextMonth = () => onChangeDate(addMonths(date, 1))
  const goToToday = () => onChangeDate(new Date())

  return (
    <div className={styles.header}>
      <span className={styles.title}>{format(date, 'MMMM yyyy')}</span>
      <div className={styles.buttons}>
        <Button secondary onClick={goToPreviousMonth}>
          Previous
        </Button>
        <Button primary onClick={goToToday}>
          Today
        </Button>
        <Button secondary onClick={gotToNextMonth}>
          Next
        </Button>
      </div>
    </div>
  )
}

Navigator.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  onChangeDate: PropTypes.func.isRequired,
}

export default Navigator
