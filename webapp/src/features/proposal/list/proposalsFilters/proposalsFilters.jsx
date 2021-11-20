import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'
import { useLocation, useNavigate } from 'react-router-dom'

import HasRole from 'features/organization/hasRole'
import { ROLE_OWNER_OR_MEMBER } from 'features/organization/constants'

import styles from './proposalsFilters.module.css'
import { filterTypes, statusLabel, ratingsLabel, sortOrderLabel, filterSortOrders } from './filters'
import { useSelection } from '../selection-context'

const { statuses, ratings } = filterTypes

const ProposalFilters = ({ event }) => {
  const navigate = useNavigate()

  const { resetSelection } = useSelection()
  const { search } = useLocation()
  const params = new URLSearchParams(search)
  const {
    id: eventId,
    deliberationEnabled,
    formats,
    categories,
    displayProposalsRatings,
    displayProposalsSpeakers,
  } = event

  const handleChange = (e) => {
    resetSelection()
    if (!e.target.value) {
      params.delete(e.target.id)
    } else {
      params.set(e.target.id, e.target.value)
    }
    params.delete('page')
    params.delete('pageSize')
    navigate(`/organizer/event/${eventId}/proposals?${params.toString()}`)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onChangeDebounced = useCallback(debounce(handleChange, 200), [handleChange])

  const handleSearchChange = (e) => {
    e.persist()
    onChangeDebounced(e)
  }

  const searchLabel = displayProposalsSpeakers ? 'Search by title or speaker' : 'Search by title'

  return (
    <div className={styles.proposalsFilters}>
      <input
        id="search"
        type="search"
        placeholder={searchLabel}
        aria-label={searchLabel}
        onChange={handleSearchChange}
        defaultValue={params.get('search')}
      />

      {deliberationEnabled && (
        <HasRole of={ROLE_OWNER_OR_MEMBER} forEvent={event}>
          <select
            id="status"
            onChange={handleChange}
            defaultValue={params.get('status')}
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
        defaultValue={params.get('ratings')}
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
        id="format"
        onChange={handleChange}
        defaultValue={params.get('format')}
        aria-label="Filter by proposal format"
      >
        <option value="">All formats</option>
        {formats?.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>

      <select
        id="category"
        onChange={handleChange}
        defaultValue={params.get('category')}
        aria-label="Filter by proposal category"
      >
        <option value="">All categories</option>
        {categories?.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>

      <select
        id="sort"
        onChange={handleChange}
        defaultValue={params.get('sort')}
        aria-label="Sort proposals"
      >
        <option value="">Sort</option>
        {filterSortOrders(!displayProposalsRatings).map((sortOrder) => (
          <option key={sortOrder} value={sortOrder}>
            {sortOrderLabel(sortOrder)}
          </option>
        ))}
      </select>
    </div>
  )
}

ProposalFilters.propTypes = {
  event: PropTypes.object.isRequired,
}

export default ProposalFilters
