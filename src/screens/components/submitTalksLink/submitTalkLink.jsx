import React from 'react'
import PropTypes from 'prop-types'

import IconLabel from 'components/iconLabel'
import Button from 'components/button'

const SubmitTalkLink = ({
  label, displayed, onClick, className,
}) => {
  if (!displayed) return null
  return (
    <Button primary>
      {btn => (
        <a onClick={onClick} role="button" className={className || btn}>
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
}

SubmitTalkLink.defaultProps = {
  label: undefined,
  displayed: false,
  className: undefined,
}

export default SubmitTalkLink
