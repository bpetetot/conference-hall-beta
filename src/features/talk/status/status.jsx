/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Badge from 'components/badge'
import './status.css'

const Status = ({
  loaded,
  submitted,
  confirmed,
  accepted,
  rejected,
  declined,
  cfpOpened,
  outOfDate,
  className,
  displayCfpStatus,
}) => {
  if (!loaded) return null
  return (
    <div className={cn('submission-status', className)}>
      {outOfDate && cfpOpened && <Badge warning>Out of date</Badge>}
      {!cfpOpened && displayCfpStatus && <Badge error>CFP closed</Badge>}
      {accepted && (
        <Badge success outline>
          Accepted
        </Badge>
      )}
      {rejected && (
        <Badge error outline>
          Not accepted
        </Badge>
      )}
      {confirmed && (
        <Badge success outline>
          Confirmed
        </Badge>
      )}
      {declined && (
        <Badge error outline>
          Declined
        </Badge>
      )}
      {submitted && !accepted && !rejected && !declined && !confirmed && (
        <Badge outline>Submitted</Badge>
      )}
    </div>
  )
}

Status.propTypes = {
  loaded: PropTypes.bool,
  submitted: PropTypes.bool,
  accepted: PropTypes.bool,
  rejected: PropTypes.bool,
  confirmed: PropTypes.bool,
  declined: PropTypes.bool,
  outOfDate: PropTypes.bool,
  cfpOpened: PropTypes.bool,
  displayCfpStatus: PropTypes.bool,
  className: PropTypes.string,
}

Status.defaultProps = {
  loaded: false,
  submitted: false,
  accepted: false,
  rejected: false,
  confirmed: false,
  declined: false,
  outOfDate: false,
  cfpOpened: true,
  displayCfpStatus: true,
  className: undefined,
}

export default Status
