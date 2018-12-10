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
  onClickEdit,
  className,
}) => {
  if (!loaded) return null
  return (
    <div className={cn('submission-status', className)}>
      {outOfDate
        && cfpOpened && (
          <Badge warning>
            {classes => (
              <a role="button" onClick={onClickEdit} className={classes}>
                Out of date
              </a>
            )}
          </Badge>
      )}
      {!cfpOpened && <Badge error>CFP closed</Badge>}
      {accepted && <Badge success outline>Accepted</Badge>}
      {rejected && <Badge error outline>Not accepted</Badge>}
      {confirmed && <Badge success>Confirmed</Badge>}
      {declined && <Badge error>Declined</Badge>}
      {submitted
        && !accepted
        && !rejected
        && !declined
        && !confirmed && <Badge outline>Submitted</Badge>}
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
  onClickEdit: PropTypes.func.isRequired,
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
  className: undefined,
}

export default Status
