import React from 'react'
import PropTypes from 'prop-types'

import './proposalFilters.css'

const ProposalFilters = ({
  formats, categories, filters, onChange,
}) => (
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
      <option value="newest">Newest</option>
      <option value="oldest">Oldest</option>
      <option value="highestRating">Highest ratings</option>
      <option value="lowestRating">Lowest ratings</option>
    </select>
  </div>
)

ProposalFilters.propTypes = {
  formats: PropTypes.arrayOf(PropTypes.object),
  categories: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func.isRequired,
}

ProposalFilters.defaultProps = {
  formats: [],
  categories: [],
}

export default ProposalFilters
