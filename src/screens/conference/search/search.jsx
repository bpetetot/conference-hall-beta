import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from '@k-redux-router/react-k-ramel'

import IconLabel from 'components/iconLabel'
import Navbar from 'screens/components/navbar'

import EventCard from './eventCard'
import styles from './search.module.css'

const SearchResults = ({ query, events }) => (
  <Fragment>
    <Navbar scrolled withSearchInput />
    <div className={styles.search}>
      <div className={styles.block}>
        <h1>{events.length} conferences</h1>
        <div className={styles.filters}>
          <span>
            In <b>France</b>
          </span>
        </div>
        <div className={styles.results}>
          {events.map(e => (
            <EventCard key={e.id} {...e} />
          ))}
        </div>
        <div className={styles.more}>
          <Link code="search" query={{ query }}>
            <IconLabel icon="fa fa-search-plus" label="View more conferences" />
          </Link>
        </div>
      </div>
      <div className={styles.block}>
        <h1>{events.length} meetups</h1>
        <div className={styles.filters}>
          <span>
            In <b>Nantes, France</b>
          </span>
        </div>
        <div className={styles.results}>
          {events.map(e => (
            <EventCard key={e.id} {...e} />
          ))}
        </div>
        <div className={styles.more}>
          <Link code="search" query={{ query }}>
            <IconLabel icon="fa fa-search-plus" label="View more meetups" />
          </Link>
        </div>
      </div>
      <div className={styles.block}>
        <h1>No conference</h1>
        <p>No conference found. Try to launch a new search with other keyword or filters.</p>
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
