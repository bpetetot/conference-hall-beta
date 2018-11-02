import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './proposalsPaging.css'

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

    if (!loaded || nbItems === 0) return null

    return (
      <div className="paging">
        <button
          type="button"
          className="paging-button page-button-previous"
          disabled={page <= 1}
          onClick={this.goToPage(page - 1)}
        >
          Previous
        </button>
        <button
          type="button"
          className="paging-button"
          disabled
        >
          {`${nbItems} proposals - page ${page}/${nbPage}`}
        </button>
        <button
          type="button"
          className="paging-button page-button-next"
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
