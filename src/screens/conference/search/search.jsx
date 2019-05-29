import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import Button from 'components/button'
import Navbar from 'screens/components/navbar'

import EventCard from './eventCard'
import styles from './search.module.css'

const SearchResults = ({ events, resetSearch }) => (
  <Fragment>
    <Navbar scrolled withSearchInput />
    <div className={styles.search}>
      {events.length === 0 ? (
        <div className={styles.block}>
          <h1>No conference</h1>
          <p>No conference found. Try to launch a new search with other keyword or filters.</p>
          <Button onClick={resetSearch}>Remove all filters</Button>
        </div>
      ) : (
        <Fragment>
          <div className={styles.block}>
            <div className={styles.filters}>
              <span className={styles.title}>{events.length} conferences</span> in{' '}
              <span className={styles.filter}>France</span> from{' '}
              <span className={styles.filter}>today</span>
            </div>
            <div className={styles.results}>
              {events.map(e => (
                <EventCard key={e.objectID} {...e} />
              ))}
            </div>
          </div>
          <div className={styles.block}>
            <div className={styles.filters}>
              <span className={styles.title}>{events.length} meetups</span> in{' '}
              <span className={styles.filter}>Nantes, France</span>
            </div>
            <div className={styles.results}>
              {events.map(e => (
                <EventCard key={e.objectID} {...e} />
              ))}
            </div>
          </div>
        </Fragment>
      )}
    </div>
  </Fragment>
)

SearchResults.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object),
  resetSearch: PropTypes.func.isRequired,
}

SearchResults.defaultProps = {
  events: [],
}

export default SearchResults
