import React from 'react'
import PropTypes from 'prop-types'

import AppLayout from 'layout'

import { ReactComponent as AlgoliaLogo } from 'styles/icons/algolia.svg'
import SearchFilters from './filters'
import Results from './results'
import NoResult from './results/noResult'
import styles from './search.module.css'

const SearchResults = ({ total }) => (
  <AppLayout className={styles.search}>
    <div>
      <SearchFilters />
      <AlgoliaLogo className={styles.algoliaLogo} />
      {total > 0 && <Results type="conference" />}
      {total > 0 && <Results type="meetup" />}
      {total === 0 && <NoResult type="event" className={styles.noResult} />}
    </div>
  </AppLayout>
)

SearchResults.propTypes = {
  total: PropTypes.number,
}

SearchResults.defaultProps = {
  total: 0,
}

export default SearchResults
