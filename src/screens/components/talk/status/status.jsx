import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Badge from 'components/badge'
import './status.css'

const Status = ({ submitted, outOfDate, className }) => (
  <div className={cn('submission-status', className)}>
    {outOfDate && <Badge className="status-warning">Out of date</Badge>}
    {submitted && <Badge>Submitted</Badge>}
  </div>
)

Status.propTypes = {
  submitted: PropTypes.bool,
  outOfDate: PropTypes.bool,
  className: PropTypes.string,
}

Status.defaultProps = {
  submitted: false,
  outOfDate: false,
  className: undefined,
}

export default Status
