import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import debounce from 'lodash/debounce'

import HasRole from 'screens/components/hasRole'
import { ROLE_OWNER_OR_MEMBER } from 'firebase/constants'

import styles from './proposalsFilters.module.css'

const sortOrderLabel = (sortOrder) =>
  ({
    newest: 'Newest',
    oldest: 'Oldest',
    highestRating: 'Highest Ratings',
    lowestRating: 'Lowest Ratings',
  }[sortOrder])

const ratingsLabel = (rating) =>
  ({
    rated: 'Rated',
    notRated: 'Not rated',
  }[rating])

const statusLabel = (status) =>
  ({
    submitted: 'Not deliberated',
    accepted: 'Accepted',
    rejected: 'Rejected',
    confirmed: 'Confirmed',
    declined: 'Declined',
  }[status])

class ProposalFilters extends Component {
  constructor(props) {
    super(props)
    this.onChange = debounce(this.props.onChange, 200)
  }

  debounceOnChange = (e) => {
    e.persist()
    this.onChange(e)
  }

  render() {
    const {
      eventId,
      statuses,
      ratings,
      formats,
      categories,
      sortOrders,
      filters,
      onChange,
      deliberationActive,
    } = this.props

    return (
      <div className={cn(styles.proposalsFilters, 'no-print')}>
        <input
          id="search"
          type="search"
          placeholder="Search by title or speaker"
          onChange={this.debounceOnChange}
          defaultValue={filters.search}
        />

        {deliberationActive && (
          <HasRole of={ROLE_OWNER_OR_MEMBER} forEventId={eventId}>
            <select id="state" onChange={onChange} defaultValue={filters.state}>
              <option value="">All statuses</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {statusLabel(status)}
                </option>
              ))}
            </select>
          </HasRole>
        )}

        <select id="ratings" onChange={onChange} defaultValue={filters.ratings}>
          <option value="">All ratings</option>
          {ratings.map((rating) => (
            <option key={rating} value={rating}>
              {ratingsLabel(rating)}
            </option>
          ))}
        </select>

        <select id="formats" onChange={onChange} defaultValue={filters.formats}>
          <option value="">All formats</option>
          {formats.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>

        <select id="categories" onChange={onChange} defaultValue={filters.categories}>
          <option value="">All categories</option>
          {categories.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>

        <select id="sortOrder" onChange={onChange} defaultValue={filters.sortOrder}>
          <option value="">Sort</option>
          {sortOrders.map((sortOrder) => (
            <option key={sortOrder} value={sortOrder}>
              {sortOrderLabel(sortOrder)}
            </option>
          ))}
        </select>
      </div>
    )
  }
}

ProposalFilters.propTypes = {
  eventId: PropTypes.string.isRequired,
  statuses: PropTypes.arrayOf(PropTypes.string),
  ratings: PropTypes.arrayOf(PropTypes.string),
  formats: PropTypes.arrayOf(PropTypes.object),
  categories: PropTypes.arrayOf(PropTypes.object),
  sortOrders: PropTypes.arrayOf(PropTypes.string),
  filters: PropTypes.objectOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  deliberationActive: PropTypes.bool,
}

ProposalFilters.defaultProps = {
  statuses: [],
  ratings: [],
  formats: [],
  categories: [],
  sortOrders: [],
  filters: {},
  deliberationActive: false,
}

export default ProposalFilters
