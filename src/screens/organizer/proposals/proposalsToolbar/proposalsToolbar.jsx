import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import debounce from 'lodash/debounce'
import isEmpty from 'lodash/isEmpty'

import Checkbox from 'components/form/checkbox'
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
      onSendEmails,
      onExportProposals,
      onAcceptProposals,
      onRejectProposals,
      selection,
      deliberationActive,
      isExporting,
      nbSelected,
      totalProposals,
    } = this.props

    const { checkAll } = this.state

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
          <div className={styles.leftActions}>
            <Checkbox
              onClick={this.handleSelect}
              label={!nbSelected ? `${totalProposals} proposals` : `${nbSelected} selected`}
              name="all-pages"
              value={checkAll}
            />
          </div>
          <div className={styles.rightActions}>
            {nbSelected === 0 && (
              <Button onClick={onExportProposals} tertiary disabled={isExporting}>
                <IconLabel
                  icon="fa fa-cloud-download"
                  label={isExporting ? 'Exporting...' : 'Export to JSON'}
                />
              </Button>
            )}
            {deliberationActive && nbSelected > 0 && (
              <Fragment>
                <Button
                  tertiary
                  onClick={() => onAcceptProposals(selection)}
                  disabled={isEmpty(selection)}
                >
                  <IconLabel icon="fa fa-check" label="Accept proposals" />
                </Button>
                <Button
                  tertiary
                  onClick={() => onRejectProposals(selection)}
                  disabled={isEmpty(selection)}
                >
                  <IconLabel icon="fa fa-close" label="Reject proposals" />
                </Button>
                <Button
                  tertiary
                  onClick={() => onSendEmails(selection)}
                  disabled={isEmpty(selection)}
                >
                  <IconLabel icon="fa fa-rocket" label="Send emails" />
                </Button>
              </Fragment>
            )}
          </div>
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
  onSendEmails: PropTypes.func.isRequired,
  onSelectAll: PropTypes.func.isRequired,
  onAcceptProposals: PropTypes.func.isRequired,
  onRejectProposals: PropTypes.func.isRequired,
  onExportProposals: PropTypes.func.isRequired,
  deliberationActive: PropTypes.bool,
  isExporting: PropTypes.bool,
  nbSelected: PropTypes.number,
  totalProposals: PropTypes.number,
}

ProposalToolbar.defaultProps = {
  statuses: [],
  selection: [],
  ratings: [],
  formats: [],
  categories: [],
  sortOrders: [],
  filters: {},
  deliberationActive: false,
  isExporting: false,
  nbSelected: 0,
  totalProposals: 0,
}

export default ProposalToolbar
