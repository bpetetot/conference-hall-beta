import React from 'react'
import cn from 'classnames'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import isNil from 'lodash/isNil'

import styles from './proposalsPaging.module.css'

const ProposalsPaging = ({ event, result }) => {
  const { search } = useLocation()
  const { page = 0, pageCount = 1, nextPage, previousPage, proposals } = result

  const getNextUrl = () => {
    const params = new URLSearchParams(search)
    params.set('page', nextPage)
    return `/organizer/event/${event.id}/proposals?${params}`
  }

  const getPreviousUrl = () => {
    const params = new URLSearchParams(search)
    params.set('page', previousPage)
    return `/organizer/event/${event.id}/proposals?${params}`
  }

  return (
    <div className={styles.paging}>
      {!isNil(previousPage) && (
        <Link className={cn(styles.button, styles.previous)} to={getPreviousUrl()}>
          Previous
        </Link>
      )}
      <div className={cn(styles.button, styles.status)}>
        {`${proposals?.length} proposals - page ${page + 1}/${pageCount}`}
      </div>
      {!isNil(nextPage) && (
        <Link className={cn(styles.button, styles.next)} to={getNextUrl()}>
          Next
        </Link>
      )}
    </div>
  )
}

ProposalsPaging.propTypes = {
  event: PropTypes.object.isRequired,
  result: PropTypes.object,
}

ProposalsPaging.defaultProps = {
  result: {},
}

export default ProposalsPaging
