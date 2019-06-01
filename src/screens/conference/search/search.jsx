import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import Navbar from 'layout/navbar'

import SearchFilters from './filters'
import Results from './results'
import NoResult from './results/noResult'
import styles from './search.module.css'

const SearchResults = ({ total }) => (
  <Fragment>
    <Navbar />
    <div className={styles.search}>
      <SearchFilters />
      {total > 0 && <Results type="conference" />}
      {total > 0 && <Results type="meetup" />}
      {total === 0 && <NoResult type="event" className={styles.noResult} />}
    </div>
  </Fragment>
)

SearchResults.propTypes = {
  total: PropTypes.number,
}

SearchResults.defaultProps = {
  total: 0,
}

export default SearchResults
