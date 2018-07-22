import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Badge from 'components/badge'
import './status.css'

const Status = ({
  loaded, submitted, cfpOpened, outOfDate, onClickEdit, className,
}) => {
  if (!loaded) return null
  return (
    <div className={cn('submission-status', className)}>
      {outOfDate && cfpOpened && (
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
}

Status.propTypes = {
  loaded: PropTypes.bool,
  submitted: PropTypes.bool,
  outOfDate: PropTypes.bool,
  cfpOpened: PropTypes.bool,
  onClickEdit: PropTypes.func.isRequired,
  className: PropTypes.string,
}

Status.defaultProps = {
  loaded: false,
  submitted: false,
  outOfDate: false,
  cfpOpened: true,
  className: undefined,
}

export default Status
