import React from 'react'
import PropTypes from 'prop-types'

import './proposalFilters.css'

const sortingLabel = sorting =>
  ({
    newest: 'Newest',
    oldest: 'Oldest',
    highestRating: 'Highest Ratings',
    lowestRating: 'Lowest Ratings',
  }[sorting])

const ProposalFilters = ({ formats, categories, sortings, filters, onChange }) => (
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

    <select id="sorting" onChange={onChange} defaultValue={filters.sorting}>
      <option value="">Sort</option>
      {sortings.map(sorting => (
        <option key={sorting} value={sorting}>
          {sortingLabel(sorting)}
        </option>
      ))}
    </select>
  </div>
)

ProposalFilters.propTypes = {
  formats: PropTypes.arrayOf(PropTypes.object),
  categories: PropTypes.arrayOf(PropTypes.object),
  sortings: PropTypes.arrayOf(PropTypes.string),
  filters: PropTypes.objectOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
}

ProposalFilters.defaultProps = {
  formats: [],
  categories: [],
  sortings: [],
  filters: {},
}

export default ProposalFilters
