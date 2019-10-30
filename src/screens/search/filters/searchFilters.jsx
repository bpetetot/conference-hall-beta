import React from 'react'
import PropTypes from 'prop-types'

import { DayPicker } from 'components/form/dayPicker'
import AddressInput from 'components/form/address'
import Button from 'components/button'
import IconLabel from 'components/iconLabel'

import InputSearch from '../inputSearch'
import styles from './searchFilters.module.css'

const SearchFilters = ({
  onFilter, onReset, defaultLocation, defaultDate,
}) => {
  const handleLocation = (location) => onFilter({ location })
  const handleDate = (date) => onFilter({ date })

  return (
    <form className={styles.filters}>
      <div className={styles.searchFilter}>
        <InputSearch className={styles.search} />
      </div>
      <div className={styles.text}>in</div>
      <div className={styles.filter}>
        <AddressInput
          id="address"
          value={defaultLocation}
          onChange={handleLocation}
          searchOptions={{ types: ['(regions)'] }}
          placeholder="the whole world"
        />
      </div>
      <div className={styles.text}>from</div>
      <div className={styles.filter}>
        <DayPicker
          id="date"
          value={defaultDate}
          onChange={handleDate}
          className={styles.dateFilter}
          placeholderText="the beginning"
        />
      </div>
      <div className={styles.actions}>
        <Button onClick={onReset} size="large" secondary className={styles.button}>
          <IconLabel icon="fa fa-times" label="Reset" />
        </Button>
      </div>
    </form>
  )
}

SearchFilters.propTypes = {
  onFilter: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  defaultLocation: PropTypes.object,
  defaultDate: PropTypes.instanceOf(Date),
}

SearchFilters.defaultProps = {
  defaultLocation: {},
  defaultDate: undefined,
}

export default SearchFilters
