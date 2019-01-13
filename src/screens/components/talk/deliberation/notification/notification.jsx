import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Button from 'components/button'
import IconLabel from 'components/iconLabel'

import styles from './notification.module.css'

const Notification = ({
  name, onConfirm, onDecline, className,
}) => (
  <div className={styles.notification}>
    <IconLabel
      className={cn(styles.message, className)}
      icon="fa fa-info-circle fa-2x"
      label={(
        <span>
          This talk has been accepted at <b>{name}</b>.
        </span>
)}
    />
    <div className={styles.actions}>
      <Button onClick={onConfirm} primary>
        I confirm my venue
      </Button>
      <Button onClick={onDecline} primary error>
        I cancel my venue
      </Button>
    </div>
  </div>
)

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
