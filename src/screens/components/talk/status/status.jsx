import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Badge from 'components/badge'
import './status.css'

const Status = ({
  submitted, cfpOpened, outOfDate, onClickEdit, className,
}) => (
  <div className={cn('submission-status', className)}>
    {outOfDate &&
      cfpOpened && (
        <Badge className="status-warning">
          <a role="button" onClick={onClickEdit}>
            Out of date
          </a>
        </Badge>
      )}
    {!cfpOpened && <Badge className="status-closed">CFP closed</Badge>}
    {submitted && <Badge>Submitted</Badge>}
  </div>
)

Status.propTypes = {
  submitted: PropTypes.bool,
  outOfDate: PropTypes.bool,
  cfpOpened: PropTypes.bool,
  onClickEdit: PropTypes.func.isRequired,
  className: PropTypes.string,
}

Status.defaultProps = {
  submitted: false,
  outOfDate: false,
  cfpOpened: true,
  className: undefined,
}

export default Status
