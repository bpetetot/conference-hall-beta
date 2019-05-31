import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import Button from 'components/button'
import Navbar from 'layout/navbar'

import SearchFilters from './filters'
import EventCard from './card'
import styles from './search.module.css'

const SearchResults = ({
  conferences, totalConferences, meetups, totalMeetups, resetSearch,
}) => (
  <Fragment>
    <Navbar scrolled withSearchInput />
    <div className={styles.search}>
      <SearchFilters type="conference" nbHits={totalConferences} />
      {totalConferences === 0 && totalMeetups === 0 ? (
        <div className={styles.block}>
          <h2>No event</h2>
          <p>No event found. Try to launch a new search with other keyword or filters.</p>
          <Button onClick={resetSearch}>Remove all filters</Button>
        </div>
      ) : (
        <Fragment>
          <div className={styles.block}>
            <h2>{totalConferences} conferences</h2>
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
            <h2>{totalMeetups} meetups</h2>
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
