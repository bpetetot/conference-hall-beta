import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from '@k-redux-router/react-k-ramel'

import Button from 'components/button'
import Navbar from 'screens/components/navbar'

import EventCard from './eventCard'
import styles from './search.module.css'

const SearchResults = ({ query, events }) => (
  <Fragment>
    <Navbar scrolled withSearchInput />
    <div className={styles.search}>
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
      <div className={styles.block}>
        <h1>No conference</h1>
        <p>No conference found. Try to launch a new search with other keyword or filters.</p>
        <Button>
          {className => (
            <Link code="search" query={{ query }} className={className}>
              Remove all filters
            </Link>
          )}
        </Button>
      </div>
    </div>
  </Fragment>
)

SearchResults.propTypes = {
  query: PropTypes.string,
  events: PropTypes.arrayOf(PropTypes.object),
}

SearchResults.defaultProps = {
  query: undefined,
  events: [],
}

export default SearchResults
