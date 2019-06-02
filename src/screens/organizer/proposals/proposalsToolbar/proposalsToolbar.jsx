import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import debounce from 'lodash/debounce'
import isEmpty from 'lodash/isEmpty'

import Checkbox from 'components/form/checkbox'
import Button from 'components/button'
import IconLabel from 'components/iconLabel'
import Dropdown from 'components/dropdown'
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

  state = {
    checkAll: this.props.selection.length,
  }

  debounceOnChange = (e) => {
    e.persist()
    this.onChange(e)
  }

  handleSelect = () => {
    this.setState(
      state => ({ checkAll: !state.checkAll }),
      () => this.props.onSelectAll(this.state.checkAll),
    )
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
      onRefresh,
      onSendEmails,
      onExportProposals,
      onAcceptProposals,
      onRejectProposals,
      selection,
      deliberationActive,
      isExporting,
    } = this.props

    const { checkAll } = this.state

    return (
      <div className={cn(styles.proposalsToolbar, 'no-print')}>
        <div className={styles.proposalsFilters}>
          <Checkbox
            onClick={this.handleSelect}
            label="All pages"
            name="all-pages"
            value={checkAll}
          />
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
          <Dropdown
            action={(
              <Button primary>
                <IconLabel icon="fa fa-angle-down" label="Actions..." />
              </Button>
            )}
          >
            <button type="button" onClick={onExportProposals} disabled={isExporting}>
              {isExporting ? (
                'Exporting...'
              ) : (
                <IconLabel icon="fa fa-cloud-download" label="Export to JSON" />
              )}
            </button>
            {deliberationActive && (
              <button
                type="button"
                onClick={() => onSendEmails(selection)}
                disabled={isEmpty(selection)}
              >
                <IconLabel icon="fa fa-rocket" label="Send emails" />
              </button>
            )}
            {deliberationActive && (
              <button
                type="button"
                onClick={() => onAcceptProposals(selection)}
                disabled={isEmpty(selection)}
              >
                <IconLabel icon="fa fa-check" label="Accept proposals" />
              </button>
            )}
            {deliberationActive && (
              <button
                type="button"
                onClick={() => onRejectProposals(selection)}
                disabled={isEmpty(selection)}
              >
                <IconLabel icon="fa fa-close" label="Reject proposals" />
              </button>
            )}
          </Dropdown>
          <Button type="button" primary onClick={onRefresh}>
            <i className="fa fa-refresh" />
          </Button>
        </div>
      </div>
    )
  }
}

ProposalToolbar.propTypes = {
  statuses: PropTypes.arrayOf(PropTypes.string),
  selection: PropTypes.arrayOf(PropTypes.string),
  ratings: PropTypes.arrayOf(PropTypes.string),
  formats: PropTypes.arrayOf(PropTypes.object),
  categories: PropTypes.arrayOf(PropTypes.object),
  sortOrders: PropTypes.arrayOf(PropTypes.string),
  filters: PropTypes.objectOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  onRefresh: PropTypes.func,
  onSendEmails: PropTypes.func.isRequired,
  onSelectAll: PropTypes.func.isRequired,
  onAcceptProposals: PropTypes.func.isRequired,
  onRejectProposals: PropTypes.func.isRequired,
  onExportProposals: PropTypes.func.isRequired,
  deliberationActive: PropTypes.bool,
  isExporting: PropTypes.bool,
}

ProposalToolbar.defaultProps = {
  onRefresh: () => {},
  statuses: [],
  selection: [],
  ratings: [],
  formats: [],
  categories: [],
  sortOrders: [],
  filters: {},
  deliberationActive: false,
  isExporting: false,
}

export default ProposalToolbar
