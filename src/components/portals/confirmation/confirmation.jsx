import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Modal from 'components/portals/modal'

import './confirmation.css'

class ConfirmationPopin extends Component {
  handleOk = hide => (e) => {
    hide()
    this.props.onOk(e)
  }

  handleCancel = hide => (e) => {
    hide()
    this.props.onCancel(e)
  }

  render() {
    const {
      className, question, onOk, onCancel, renderTrigger, open,
    } = this.props

    return (
      <Modal
        defaultOpen={open}
        renderTrigger={renderTrigger}
        onClose={this.handleCancel}
        withCloseIcon={false}
        withClickOutside={false}
        withEscapeClose={false}
        className={cn('confirmation-popin', className)}
      >
        {({ hide }) => (
          <Fragment>
            {question && <div className="confirmation-question">{question}</div>}
            <div className="confirmation-actions">
              {onCancel && (
                <button className="btn btn-default" onClick={this.handleCancel(hide)} type="button">
                  Cancel
                </button>
              )}
              {onOk && (
                <button className="btn btn-primary" onClick={this.handleOk(hide)} type="button">
                  Ok
                </button>
              )}
            </div>
          </Fragment>
        )}
      </Modal>
    )
  }
}

ConfirmationPopin.propTypes = {
  open: PropTypes.bool,
  question: PropTypes.node,
  renderTrigger: PropTypes.func,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  className: PropTypes.string,
}

ConfirmationPopin.defaultProps = {
  question: undefined,
  renderTrigger: undefined,
  className: undefined,
  onOk: undefined,
  onCancel: undefined,
  open: false,
}

export default ConfirmationPopin
