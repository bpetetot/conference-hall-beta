import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import debounce from 'lodash/debounce'

import Button from 'components/button'
import IconLabel from 'components/iconLabel'

import styles from './proposalsToolbar.module.css'

const sortOrderLabel = sortOrder => ({
  newest: 'Newest',
  oldest: 'Oldest',
  highestRating: 'Highest Ratings',
  lowestRating: 'Lowest Ratings',
}[sortOrder])

const ratingsLabel = rating => ({
  rated: 'Rated',
  notRated: 'Not rated',
}[rating])

const statusLabel = status => ({
  submitted: 'Not deliberated',
  accepted: 'Accepted',
  rejected: 'Rejected',
  confirmed: 'Confirmed',
  declined: 'Declined',
}[status])

class ProposalToolbar extends Component {
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
      statuses,
      ratings,
      formats,
      categories,
      sortOrders,
      filters,
      onChange,
      onExportProposals,
      deliberationActive,
      isExporting,
    } = this.props

    return (
      <div className={cn(styles.proposalsToolbar, 'no-print')}>
        <div className={styles.proposalsFilters}>
          <input
            id="search"
            type="search"
            placeholder="Search by title or speaker"
            onChange={this.debounceOnChange}
            defaultValue={filters.search}
          />

          {deliberationActive && (
            <select id="state" onChange={onChange} defaultValue={filters.state}>
              <option value="">All statuses</option>
              {statuses.map(status => (
                <option key={status} value={status}>
                  {statusLabel(status)}
                </option>
              ))}
            </select>
          )}

          <select id="ratings" onChange={onChange} defaultValue={filters.ratings}>
            <option value="">All ratings</option>
            {ratings.map(rating => (
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
            {sortOrders.map(sortOrder => (
              <option key={sortOrder} value={sortOrder}>
                {sortOrderLabel(sortOrder)}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.proposalsActions}>
          <Button onClick={onExportProposals} secondary disabled={isExporting}>
            {isExporting ? (
              'Exporting...'
            ) : (
              <IconLabel icon="fa fa-cloud-download" label="Export to JSON" />
            )}
          </Button>
        </div>
      </div>
    )
  }
}

ProposalToolbar.propTypes = {
  statuses: PropTypes.arrayOf(PropTypes.string),
  ratings: PropTypes.arrayOf(PropTypes.string),
  formats: PropTypes.arrayOf(PropTypes.object),
  categories: PropTypes.arrayOf(PropTypes.object),
  sortOrders: PropTypes.arrayOf(PropTypes.string),
  filters: PropTypes.objectOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  onExportProposals: PropTypes.func.isRequired,
  deliberationActive: PropTypes.bool,
  isExporting: PropTypes.bool,
}

ProposalToolbar.defaultProps = {
  statuses: [],
  ratings: [],
  formats: [],
  categories: [],
  sortOrders: [],
  filters: {},
  deliberationActive: false,
  isExporting: false,
}

export default ProposalToolbar
