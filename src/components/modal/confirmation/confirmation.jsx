import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Modal from '../modal'

import './confirmation.css'

class ConfirmationPopin extends Component {
  state = { isOpen: this.props.open }

  show = () => this.setState({ isOpen: true })

  hide = () => this.setState({ isOpen: false })

  toggle = () => this.setState(state => ({ isOpen: !state.isOpen }))

  handleOk = (e) => {
    this.hide()
    this.props.onClickOk(e)
  }

  handleCancel = (e) => {
    this.hide()
    this.props.onClickCancel(e)
  }

  render() {
    const {
      className, question, onClickOk, onClickCancel, renderTrigger,
    } = this.props
    const { isOpen } = this.state
    const { show, hide, toggle } = this

    return (
      <Fragment>
        {renderTrigger &&
          renderTrigger({
            isOpen,
            show,
            hide,
            toggle,
          })}
        <Modal
          open={isOpen}
          onClose={this.handleCancel}
          withCloseIcon={false}
          withClickOutside={false}
          className={cn('confirmation-popin', className)}
        >
          {question && <div className="confirmation-question">{question}</div>}
          <div className="confirmation-actions">
            {onClickCancel && (
              <button className="btn btn-default" onClick={this.handleCancel} type="button">
                Cancel
              </button>
            )}
            {onClickOk && (
              <button className="btn btn-primary" onClick={this.handleOk} type="button">
                Ok
              </button>
            )}
          </div>
        </Modal>
      </Fragment>
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
