import React from 'react'
import PropTypes from 'prop-types'

import './proposalFilters.css'

const sortOrderLabel = sortOrder =>
  ({
    newest: 'Newest',
    oldest: 'Oldest',
    highestRating: 'Highest Ratings',
    lowestRating: 'Lowest Ratings',
  }[sortOrder])

const ProposalFilters = ({ formats, categories, sortOrders, filters, onChange }) => (
  <div className="proposals-filters">
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
      {sortOrders.map(sortOrder => (
        <option key={sortOrder} value={sortOrder}>
          {sortOrderLabel(sortOrder)}
        </option>
      ))}
    </select>
  </div>
)

ProposalFilters.propTypes = {
  formats: PropTypes.arrayOf(PropTypes.object),
  categories: PropTypes.arrayOf(PropTypes.object),
  sortOrders: PropTypes.arrayOf(PropTypes.string),
  filters: PropTypes.objectOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
}

ProposalFilters.defaultProps = {
  formats: [],
  categories: [],
  sortOrders: [],
  filters: {},
}

export default ProposalFilters
