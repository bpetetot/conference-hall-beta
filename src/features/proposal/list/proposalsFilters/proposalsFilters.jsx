import React, { useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import debounce from 'lodash/debounce'
import { useLocation, useNavigate } from 'react-router-dom'

import HasRole from 'features/organization/hasRole'

import styles from './proposalsFilters.module.css'
import { filterTypes, statusLabel, ratingsLabel, sortOrderLabel, filterSortOrders } from './filters'
import { ROLE_OWNER_OR_MEMBER } from '../../../../firebase/constants'

const { statuses, ratings } = filterTypes

function ProposalFilters({ eventId, formats, categories, hideRatings, deliberationActive }) {
  const navigate = useNavigate()

  const { search } = useLocation()

  const params = useMemo(() => new URLSearchParams(search), [search])

  const searchFilter = params.get('search')
  const stateFilter = params.get('state')
  const ratingsFilter = params.get('ratings')
  const formatsFilter = params.get('formats')
  const categoriesFilter = params.get('categories')
  const sortOrderFilter = params.get('sortOrder')

  const handleChange = useCallback(
    (event) => {
      const { id, value } = event.target
      params.set(id, value)
      navigate(`/organizer/event/${eventId}/proposals?${params.toString()}`)
    },
    [navigate, params, eventId],
  )

  const onChangeDebounced = useCallback(debounce(handleChange, 200), [handleChange]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSearchChange = (e) => {
    e.persist()
    onChangeDebounced(e)
  }

  return (
    <div className={cn(styles.proposalsFilters, 'no-print')}>
      <input
        id="search"
        type="search"
        placeholder="Search by title or speaker"
        aria-label="Search by title or speaker"
        onChange={handleSearchChange}
        defaultValue={searchFilter}
      />

      {deliberationActive && (
        <HasRole of={ROLE_OWNER_OR_MEMBER} forEventId={eventId}>
          <select
            id="state"
            onChange={handleChange}
            defaultValue={stateFilter}
            aria-label="Filter by proposal status"
          >
            <option value="">All statuses</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {statusLabel(status)}
              </option>
            ))}
          </select>
        </HasRole>
      )}

      <select
        id="ratings"
        onChange={handleChange}
        defaultValue={ratingsFilter}
        aria-label="Filter by your ratings"
      >
        <option value="">All ratings</option>
        {ratings.map((rating) => (
          <option key={rating} value={rating}>
            {ratingsLabel(rating)}
          </option>
        ))}
      </select>

      <select
        id="formats"
        onChange={handleChange}
        defaultValue={formatsFilter}
        aria-label="Filter by proposal format"
      >
        <option value="">All formats</option>
        {formats.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>

      <select
        id="categories"
        onChange={handleChange}
        defaultValue={categoriesFilter}
        aria-label="Filter by proposal category"
      >
        <option value="">All categories</option>
        {categories.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>

      <select
        id="sortOrder"
        onChange={handleChange}
        defaultValue={sortOrderFilter}
        aria-label="Sort proposals"
      >
        <option value="">Sort</option>
        {filterSortOrders(hideRatings).map((sortOrder) => (
          <option key={sortOrder} value={sortOrder}>
            {sortOrderLabel(sortOrder)}
          </option>
        ))}
      </select>
    </div>
  )
}

ProposalFilters.propTypes = {
  eventId: PropTypes.string.isRequired,
  formats: PropTypes.arrayOf(PropTypes.object),
  categories: PropTypes.arrayOf(PropTypes.object),
  hideRatings: PropTypes.bool,
  deliberationActive: PropTypes.bool,
}

ProposalFilters.defaultProps = {
  formats: [],
  categories: [],
  hideRatings: false,
  deliberationActive: false,
}

export default ProposalFilters
