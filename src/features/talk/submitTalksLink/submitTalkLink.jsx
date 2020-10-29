/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useMatch, useNavigate } from 'react-router-dom'
import cn from 'classnames'

import IconLabel from 'components/iconLabel'
import Button from 'components/button'

const SubmitTalkLink = ({
  eventId,
  label,
  displayed,
  onClick,
  className,
  classNameActive,
  size,
}) => {
  const navigate = useNavigate()
  const match = useMatch({ path: `/speaker/event/${eventId}/submission`, end: true })

  const handleClick = useCallback(() => {
    onClick()
    navigate(`/speaker/event/${eventId}/submission`)
  }, [onClick, navigate, eventId])

  if (!displayed) return null
  return (
    <Button primary accent size={size}>
      {(btn) => (
        <a
          onClick={handleClick}
          role="button"
          className={cn(className, { [classNameActive]: match }) || btn}
        >
          {label || <IconLabel icon="fa fa-paper-plane" label="Submit a talk" />}
        </a>
      )}
    </Button>
  )
}

SubmitTalkLink.propTypes = {
  eventId: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string,
  displayed: PropTypes.bool,
  className: PropTypes.string,
  classNameActive: PropTypes.string,
  size: PropTypes.string,
}

SubmitTalkLink.defaultProps = {
  label: undefined,
  displayed: false,
  className: undefined,
  classNameActive: undefined,
  size: 'normal',
}

export default SubmitTalkLink
