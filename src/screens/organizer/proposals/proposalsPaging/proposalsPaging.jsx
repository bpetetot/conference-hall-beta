import React, { Component } from 'react'
import cn from 'classnames'
import PropTypes from 'prop-types'

import styles from './proposalsPaging.module.css'

class ProposalsPaging extends Component {
  goToPage = page => () => {
    this.props.onPageChange(page)
  }

  render() {
    const {
      loaded,
      nbItems,
      nbPage,
      page,
    } = this.props

    if (!loaded || nbPage <= 1) return null

    return (
      <div className={styles.paging}>
        <button
          type="button"
          className={cn(styles.button, styles.previous)}
          disabled={page <= 1}
          onClick={this.goToPage(page - 1)}
        >
          Previous
        </button>
        <div className={cn(styles.button, styles.status)}>
          {`${nbItems} proposals - page ${page}/${nbPage}`}
        </div>
        <button
          type="button"
          className={cn(styles.button, styles.next)}
          disabled={page >= nbPage}
          onClick={this.goToPage(page + 1)}
        >
          Next
        </button>
      </div>
    )
  }
}

ProposalsPaging.propTypes = {
  loaded: PropTypes.bool.isRequired,
  nbItems: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  nbPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
}

export default ProposalsPaging
