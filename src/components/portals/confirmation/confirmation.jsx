import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Modal from 'components/portals/modal'
import OpenTrigger from 'components/portals/openTrigger'

import './confirmation.css'

class ConfirmationPopin extends Component {
  handleOk = hide => (e) => {
    hide()
    this.props.onClickOk(e)
  }

  handleCancel = hide => (e) => {
    hide()
    this.props.onClickCancel(e)
  }

  render() {
    const {
      className, question, onClickOk, onClickCancel, renderTrigger, open,
    } = this.props

    return (
      <OpenTrigger open={open} renderTrigger={renderTrigger}>
        {({ isOpen, hide }) => (
          <Modal
            open={isOpen}
            onClose={this.handleCancel(hide)}
            withCloseIcon={false}
            withClickOutside={false}
            className={cn('confirmation-popin', className)}
          >
            {question && <div className="confirmation-question">{question}</div>}
            <div className="confirmation-actions">
              {onClickCancel && (
                <button className="btn btn-default" onClick={this.handleCancel(hide)} type="button">
                  Cancel
                </button>
              )}
              {onClickOk && (
                <button className="btn btn-primary" onClick={this.handleOk(hide)} type="button">
                  Ok
                </button>
              )}
            </div>
          </Modal>
        )}
      </OpenTrigger>
    )
  }
}

ConfirmationPopin.propTypes = {
  open: PropTypes.bool,
  question: PropTypes.node,
  renderTrigger: PropTypes.func,
  onClickOk: PropTypes.func,
  onClickCancel: PropTypes.func,
  className: PropTypes.string,
}

ConfirmationPopin.defaultProps = {
  question: undefined,
  renderTrigger: undefined,
  className: undefined,
  onClickOk: undefined,
  onClickCancel: undefined,
  open: false,
}

export default ConfirmationPopin
