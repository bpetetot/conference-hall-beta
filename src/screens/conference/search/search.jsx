import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import Button from 'components/button'
import Navbar from 'screens/components/navbar'

import EventCard from './eventCard'
import styles from './search.module.css'

const SearchResults = ({
  conferences, totalConferences, meetups, totalMeetups, resetSearch,
}) => (
  <Fragment>
    <Navbar scrolled withSearchInput />
    <div className={styles.search}>
      {totalConferences === 0 && totalMeetups === 0 ? (
        <div className={styles.block}>
          <h1>No event</h1>
          <p>No event found. Try to launch a new search with other keyword or filters.</p>
          <Button onClick={resetSearch}>Remove all filters</Button>
        </div>
      ) : (
        <Fragment>
          <div className={styles.block}>
            <div className={styles.filters}>
              <span className={styles.title}>{totalConferences} conferences</span> in{' '}
              <span className={styles.filter}>France</span> from{' '}
              <span className={styles.filter}>today</span>
            </div>
            <div className={styles.results}>
              {conferences.map(e => (
                <EventCard key={e.objectID} {...e} />
              ))}
            </div>
            {totalConferences === 0 && (
              <Fragment>
                <p>
                  No conference found. Try to launch a new search with other keyword or filters.
                </p>
                <Button onClick={resetSearch}>Remove all filters</Button>
              </Fragment>
            )}
          </div>
          <div className={styles.block}>
            <div className={styles.filters}>
              <span className={styles.title}>{totalMeetups} meetups</span> in{' '}
              <span className={styles.filter}>Nantes, France</span>
            </div>
            <div className={styles.results}>
              {meetups.map(e => (
                <EventCard key={e.objectID} {...e} />
              ))}
            </div>
            {totalMeetups === 0 && (
              <Fragment>
                <p>No meetup found. Try to launch a new search with other keyword or filters.</p>
                <Button onClick={resetSearch}>Remove all filters</Button>
              </Fragment>
            )}
          </div>
        </Fragment>
      )}
    </div>
  </Fragment>
)

SearchResults.propTypes = {
  conferences: PropTypes.arrayOf(PropTypes.object),
  totalConferences: PropTypes.number,
  meetups: PropTypes.arrayOf(PropTypes.object),
  totalMeetups: PropTypes.number,
  resetSearch: PropTypes.func.isRequired,
}

SearchResults.defaultProps = {
  totalConferences: 0,
  conferences: [],
  totalMeetups: 0,
  meetups: [],
}

export default SearchResults
