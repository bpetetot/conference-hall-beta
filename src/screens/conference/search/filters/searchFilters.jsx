import React from 'react'
import PropTypes from 'prop-types'

import { DayPicker } from 'components/form/dayPicker'
import AddressInput from 'components/form/address'

import styles from './searchFilters.module.css'

const SearchFilters = ({ onFilter, defaultLocation, defaultDate }) => {
  const handleLocation = location => onFilter({ location })
  const handleDate = date => onFilter({ date })

  return (
    <form className={styles.filters}>
      <div className={styles.title}>Events in&nbsp;</div>
      <div className={styles.filter}>
        <AddressInput
          id="address"
          value={defaultLocation}
          onChange={handleLocation}
          searchOptions={{ types: ['(regions)'] }}
          placeholder="the whole world"
        />
      </div>
      <div className={styles.title}>&nbsp;from&nbsp;</div>
      <div className={styles.filter}>
        <DayPicker
          id="date"
          value={defaultDate}
          onChange={handleDate}
          className={styles.dateFilter}
          placeholderText="the beginning"
        />
      </div>
    </form>
  )
}

SearchFilters.propTypes = {
  onFilter: PropTypes.func.isRequired,
  defaultLocation: PropTypes.object,
  defaultDate: PropTypes.instanceOf(Date),
}

SearchFilters.defaultProps = {
  defaultLocation: {},
  defaultDate: undefined,
}

export default SearchFilters
