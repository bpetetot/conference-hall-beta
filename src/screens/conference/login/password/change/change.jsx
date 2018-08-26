import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal } from 'components/portals'
import Button from 'components/button'

import './change.css'

class ChangePasswordModal extends Component {
  state = {
    email: undefined,
  }

  handleSendPasswordEmail = closeModal => () => {
    const { sendChangePasswordEmail } = this.props
    sendChangePasswordEmail(this.state.email, closeModal)
  }

  handleEmail = (e) => {
    this.setState({ email: e.target.value })
  }

  render() {
    const { modalTrigger, error } = this.props
    const { email } = this.state
    return (
      <Modal
        className="change-password-modal"
        backdropClassName="change-password-backdrop"
        renderTrigger={modalTrigger}
      >
        {({ hide }) => (
          <div className="change-password">
            <h1>Change password</h1>
            <small>An email with a link to change your password will be sent to:</small>
            <input
              type="email"
              name="email"
              placeholder="Email"
              autoComplete="email"
              onChange={this.handleEmail}
            />
            <small className="change-password-error">{error}</small>
            <Button
              disabled={!email}
              className="change-password-btn"
              onClick={this.handleSendPasswordEmail(hide)}
            >
              Send change password email
            </Button>
          </div>
        )}
      </Modal>
    )
  }
}

ChangePasswordModal.propTypes = {
  modalTrigger: PropTypes.func.isRequired,
  sendChangePasswordEmail: PropTypes.func.isRequired,
  error: PropTypes.string,
}

ChangePasswordModal.defaultProps = {
  error: undefined,
}

export default ChangePasswordModal
