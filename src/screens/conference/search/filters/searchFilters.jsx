import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { DayPicker } from 'components/form/dayPicker'
import AddressInput from 'components/form/address'
import Button from 'components/button'
import IconLabel from 'components/iconLabel'

import styles from './searchFilters.module.css'

const SearchFilters = ({ onFilter, defaultLocation, defaultDate }) => {
  const [location, setLocation] = useState(defaultLocation)
  const [date, setDate] = useState(defaultDate)

  const handleFilter = () => {
    onFilter({ location, date })
  }

  return (
    <div className={styles.filters}>
      <div className={styles.title}>Events in&nbsp;</div>
      <div className={styles.filter}>
        <AddressInput
          id="address"
          value={defaultLocation}
          onChange={setLocation}
          searchOptions={{ types: ['(regions)'] }}
          placeholder="the whole world"
        />
      </div>
      <div className={styles.title}>&nbsp;from&nbsp;</div>
      <div className={styles.filter}>
        <DayPicker
          id="date"
          value={defaultDate}
          onChange={setDate}
          className={styles.dateFilter}
          placeholderText="the beginning"
        />
      </div>
      <div className={styles.button}>
        <Button type="button" onClick={handleFilter} size="large">
          <IconLabel icon="fa fa-filter" label="Filter" />
        </Button>
      </div>
    </div>
  )
}

SearchFilters.propTypes = {
  onFilter: PropTypes.func.isRequired,
  defaultLocation: PropTypes.string,
  defaultDate: PropTypes.instanceOf(Date),
}

SearchFilters.defaultProps = {
  defaultLocation: undefined,
  defaultDate: undefined,
}

export default SearchFilters
