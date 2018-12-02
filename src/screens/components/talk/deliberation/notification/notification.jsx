import React from 'react'
import PropTypes from 'prop-types'

import Button from 'components/button'
import IconLabel from 'components/iconLabel'

import styles from './notification.module.css'

const Notification = ({ name, onChange }) => (
  <div className={styles.notification}>
    <IconLabel
      className={styles.message}
      icon="fa fa-info-circle fa-2x"
      label={(
        <span>
          This talk has been accepted at <b>{name}</b>.
        </span>
      )}
    />
    <div className={styles.actions}>
      <Button onClick={onChange} primary>
        I confirm my venue
      </Button>
      <Button onClick={onChange} primary error>
        I cancel my venue
      </Button>
    </div>
  </div>
)

Notification.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

Notification.defaultProps = {
  name: undefined,
}

export default Notification
