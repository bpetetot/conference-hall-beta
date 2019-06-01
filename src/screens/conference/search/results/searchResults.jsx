import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import EventCard from './card'
import NoResult from './noResult'
import styles from './searchResults.module.css'

const SearchResults = ({ results, total, type }) => (
  <div className={styles.block}>
    {total !== 0 && (
      <Fragment>
        <h2>
          {total} {type}
        </h2>
        <div className={styles.results}>
          {results.map(e => (
            <EventCard key={e.objectID} {...e} />
          ))}
        </div>
      </Fragment>
    )}
    {total === 0 && <NoResult type={type} />}
  </div>
)

SearchResults.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object),
  total: PropTypes.number,
  type: PropTypes.string.isRequired,
}

SearchResults.defaultProps = {
  results: [],
  total: 0,
}

export default SearchResults
