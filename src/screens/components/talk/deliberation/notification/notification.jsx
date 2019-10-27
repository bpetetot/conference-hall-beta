import React from 'react'
import PropTypes from 'prop-types'

import Button from 'components/button'
import Alert from 'components/alert'


const Notification = ({
  name, onConfirm, onDecline, className,
}) => {
  const title = `This talk has been accepted at ${name}.`
  return (
    <Alert
      type="info"
      className={className}
      title={title}
      actionButtons={(
        <>
          <Button onClick={onConfirm} primary>
            I confirm my presence
          </Button>
          <Button onClick={onDecline} primary error>
            I cancel my presence
          </Button>
        </>
      )}
    />
  )
}

Notification.propTypes = {
  name: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  onDecline: PropTypes.func.isRequired,
  className: PropTypes.string,
}

Notification.defaultProps = {
  name: undefined,
  className: undefined,
}

export default Notification
