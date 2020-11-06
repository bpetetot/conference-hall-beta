import React, { useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import get from 'lodash/get'
import debounce from 'lodash/debounce'
import { useLocation, useNavigate } from 'react-router-dom'

import HasRole from 'features/organization/hasRole'
import { ROLE_OWNER_OR_MEMBER } from 'firebase/constants'
import { useEvent } from 'features/event/useEvents'
import { useEventSettings } from 'features/event/useEventSettings'

import styles from './proposalsFilters.module.css'
import { filterTypes, statusLabel, ratingsLabel, sortOrderLabel, filterSortOrders } from './filters'

const { statuses, ratings } = filterTypes

function ProposalFilters({ eventId }) {
  const { data: event } = useEvent(eventId)
  const { data: settings } = useEventSettings(eventId)
  const hideRatings = get(settings, 'deliberation.hideRatings')
  const deliberationActive = get(settings, 'deliberation.enabled')

  const { search } = useLocation()
  const params = useMemo(() => new URLSearchParams(search), [search])
  const searchFilter = params.get('search')
  const stateFilter = params.get('state')
  const ratingsFilter = params.get('ratings')
  const formatsFilter = params.get('formats')
  const categoriesFilter = params.get('categories')
  const sortOrderFilter = params.get('sortOrder')

  const navigate = useNavigate()
  const handleChange = useCallback(
    ({ target }) => {
      const { id, value } = target
      params.set(id, value)
      navigate(`/organizer/event/${eventId}/proposals?${params.toString()}`)
    },
    [navigate, params, eventId],
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onChangeDebounced = useCallback(debounce(handleChange, 200), [handleChange])

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
        onChange={handleSearchChange}
        defaultValue={searchFilter}
      />

      {deliberationActive && (
        <HasRole of={ROLE_OWNER_OR_MEMBER} forEventId={eventId}>
          <select id="state" onChange={handleChange} defaultValue={stateFilter}>
            <option value="">All statuses</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {statusLabel(status)}
              </option>
            ))}
          </select>
        </HasRole>
      )}

      <select id="ratings" onChange={handleChange} defaultValue={ratingsFilter}>
        <option value="">All ratings</option>
        {ratings.map((rating) => (
          <option key={rating} value={rating}>
            {ratingsLabel(rating)}
          </option>
        ))}
      </select>

      <select id="formats" onChange={handleChange} defaultValue={formatsFilter}>
        <option value="">All formats</option>
        {event?.formats?.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>

      <select id="categories" onChange={handleChange} defaultValue={categoriesFilter}>
        <option value="">All categories</option>
        {event?.categories?.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>

      <select id="sortOrder" onChange={handleChange} defaultValue={sortOrderFilter}>
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
}

export default ProposalFilters
