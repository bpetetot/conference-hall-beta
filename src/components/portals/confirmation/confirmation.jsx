import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Modal from 'components/portals/modal'
import Button from 'components/button'

import './confirmation.css'

class ConfirmationPopin extends Component {
  handleOk = hide => e => {
    hide()
    if (this.props.onOk) {
      this.props.onOk(e)
    }
  }

  handleCancel = hide => e => {
    hide()
    if (this.props.onCancel) {
      this.props.onCancel(e)
    }
  }

  render() {
    const {
      className,
      title,
      content,
      onOk,
      withOk,
      onCancel,
      withCancel,
      renderTrigger,
      defaultOpen,
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
          <>
            <div className="confirmation-text">
              {title && <div className="confirmation-title">{title}</div>}
              {content && <div className="confirmation-content">{content}</div>}
            </div>
            <div className="confirmation-actions">
              {(withCancel || onCancel) && (
                <Button secondary onClick={this.handleCancel(hide)}>
                  Cancel
                </Button>
              )}
              {(withOk || onOk) && (
                <Button accent onClick={this.handleOk(hide)}>
                  Ok
                </Button>
              )}
            </div>
          </>
        )}
      </Modal>
    )
  }
}

ConfirmationPopin.propTypes = {
  title: PropTypes.node,
  content: PropTypes.node,
  defaultOpen: PropTypes.bool,
  renderTrigger: PropTypes.func,
  onOk: PropTypes.func,
  withOk: PropTypes.bool,
  onCancel: PropTypes.func,
  withCancel: PropTypes.bool,
  className: PropTypes.string,
}

ConfirmationPopin.defaultProps = {
  title: undefined,
  content: undefined,
  defaultOpen: false,
  renderTrigger: undefined,
  onOk: undefined,
  withOk: false,
  onCancel: undefined,
  withCancel: false,
  className: undefined,
}

export default ConfirmationPopin
