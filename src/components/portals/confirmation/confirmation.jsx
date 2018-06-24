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
      className, question, onOk, onCancel, renderTrigger, defaultOpen,
    } = this.props

    return (
      <Modal
        defaultOpen={defaultOpen}
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
  question: PropTypes.node,
  defaultOpen: PropTypes.bool,
  renderTrigger: PropTypes.func,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  className: PropTypes.string,
}

ConfirmationPopin.defaultProps = {
  question: undefined,
  defaultOpen: false,
  renderTrigger: undefined,
  onOk: undefined,
  onCancel: undefined,
  className: undefined,
}

export default ConfirmationPopin
