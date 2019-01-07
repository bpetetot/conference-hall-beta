/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import IconLabel from 'components/iconLabel'
import Button from 'components/button'

const SubmitTalkLink = ({
  label, displayed, onClick, className, classNameActive,
}) => {
  if (!displayed) return null
  return (
    <Button primary accent>
      {btn => (
        <a onClick={onClick} role="button" className={cn(className, classNameActive) || btn}>
          {label || <IconLabel icon="fa fa-paper-plane" label="Submit a talk" />}
        </a>
      )}
    </Button>
  )
}

SubmitTalkLink.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  displayed: PropTypes.bool,
  className: PropTypes.string,
  classNameActive: PropTypes.string,
}

SubmitTalkLink.defaultProps = {
  label: undefined,
  displayed: false,
  className: undefined,
  classNameActive: undefined,
}

export default SubmitTalkLink
