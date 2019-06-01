import React, { Fragment } from 'react'

import Navbar from 'layout/navbar'

import SearchFilters from './filters'
import Results from './results'
import styles from './search.module.css'

const SearchResults = () => (
  <Fragment>
    <Navbar scrolled withSearchInput />
    <div className={styles.search}>
      <SearchFilters />
      <Results type="conference" />
      <Results type="meetup" />
    </div>
  </Fragment>
)

export default SearchResults
