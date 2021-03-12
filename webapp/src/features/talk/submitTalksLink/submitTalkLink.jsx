/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import cn from 'classnames'

import IconLabel from 'components/iconLabel'
import Button from 'components/button'

const SubmitTalkLink = ({ eventId, label, displayed, className, size }) => {
  if (!displayed) return null

  return (
    <Button primary accent size={size}>
      {(btn) => (
        <Link to={`/speaker/event/${eventId}/submission`} className={cn(btn, className)}>
          {label || <IconLabel icon="fa fa-paper-plane" label="Submit a talk" />}
        </Link>
      )}
    </Button>
  )
}

SubmitTalkLink.propTypes = {
  eventId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string,
  displayed: PropTypes.bool,
  className: PropTypes.string,
  size: PropTypes.string,
}

SubmitTalkLink.defaultProps = {
  label: undefined,
  displayed: false,
  className: undefined,
  size: 'normal',
}

export default SubmitTalkLink
