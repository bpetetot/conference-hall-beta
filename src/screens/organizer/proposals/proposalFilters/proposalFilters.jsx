import React from 'react'
import PropTypes from 'prop-types'

import './proposalFilters.css'

const ProposalFilters = ({ formats, categories }) => (
  <div className="proposals-filters">
    <select id="ratings">
      <option value="default">All ratings</option>
      <option value="rated">Rated</option>
      <option value="notRated">Not rated</option>
    </select>
    <select id="categories">
      <option value="default">All categories</option>
      {categories.map(({ id, name }) => (
        <option key={id} name={id}>
          {name}
        </option>
      ))}
    </select>
    <select id="formats">
      <option value="default">All formats</option>
      {formats.map(({ id, name }) => (
        <option key={id} name={id}>
          {name}
        </option>
      ))}
    </select>
    <select id="sorting">
      <option value="default">Sort</option>
      <option value="newest">Newest</option>
      <option value="oldest">Oldest</option>
      <option value="highestRating">Highest ratings</option>
      <option value="lowestRating">Lowest ratings</option>
    </select>
  </div>
)

ProposalFilters.propTypes = {
  formats: PropTypes.arrayOf(PropTypes.string),
  categories: PropTypes.arrayOf(PropTypes.string),
}

ProposalFilters.defaultProps = {
  formats: [],
  categories: [],
}

export default ProposalFilters
