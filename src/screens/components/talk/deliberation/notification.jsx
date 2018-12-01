import React from 'react'
import PropTypes from 'prop-types'

import './notification.css'
import Button from 'components/button'

const Notification = ({ name, submission, onChange }) => (
  <div className="message success">
    <div className="message-icon">
      <i className="fa fa-info" />
    </div>
    <div className="message-body">
      <p>Your talk {submission.title} has been accepted at {name}!</p>
      <p><Button onClick={onChange} primary>Please confirm your venue.</Button></p>
    </div>
  </div>
)

Notification.propTypes = {
  name: PropTypes.string,
  submission: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}

Notification.defaultProps = {
  name: undefined,
}

export default Notification
