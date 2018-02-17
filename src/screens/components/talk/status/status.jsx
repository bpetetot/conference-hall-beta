import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Badge from 'components/badge'
import './status.css'

const Status = ({
  submitted, outOfDate, onClickEdit, className,
}) => (
  <div className={cn('submission-status', className)}>
    {outOfDate && (
      <Badge className="status-warning">
        <a role="button" onClick={onClickEdit}>
          Out of date
        </a>
      </Badge>
    )}
    {submitted && <Badge>Submitted</Badge>}
  </div>
)

Status.propTypes = {
  submitted: PropTypes.bool,
  outOfDate: PropTypes.bool,
  onClickEdit: PropTypes.func.isRequired,
  className: PropTypes.string,
}

Status.defaultProps = {
  submitted: false,
  outOfDate: false,
  className: undefined,
}

export default Status
