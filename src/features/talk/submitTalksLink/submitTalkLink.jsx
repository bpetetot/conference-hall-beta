/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

import IconLabel from 'components/iconLabel'
import Button from 'components/button'

const SubmitTalkLink = ({ eventId, label, displayed, onClick, className, size }) => {
  const navigate = useNavigate()

  const handleClick = useCallback(() => {
    onClick()
    navigate(`/speaker/event/${eventId}/submission`)
  }, [onClick, navigate, eventId])

  if (!displayed) return null
  return (
    <Button primary accent size={size} onClick={handleClick} className={className}>
      {label || <IconLabel icon="fa fa-paper-plane" label="Submit a talk" />}
    </Button>
  )
}

SubmitTalkLink.propTypes = {
  eventId: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
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
