import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Modal from '../modal'

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
      className,
      title,
      subtitle,
      children,
      onClickOk,
      onClickCancel,
      renderTrigger,
    } = this.props
    const { isOpen } = this.state
    const { show, hide, toggle } = this

    return (
      <Fragment>
        {renderTrigger && renderTrigger({
          isOpen,
          show,
          hide,
          toggle,
        })}
        <Modal opened={isOpen} onClose={hide} className={cn('ConfirmationPopin', className)}>
          {title && <h1>{title}</h1>}
          {subtitle && <h2>{subtitle}</h2>}
          {children && <div>{children}</div>}
          <div>
            {onClickOk && (
              <button className="btn btn-primary" onClick={this.handleOk} type="button">
                Ok
              </button>
            )}
            {onClickCancel && (
              <button className="btn btn-default" onClick={this.handleCancel} type="button">
                Cancel
              </button>
            )}
          </div>
        </Modal>
      </Fragment>
    )
  }
}

ConfirmationPopin.propTypes = {
  title: PropTypes.node,
  subtitle: PropTypes.node,
  children: PropTypes.node,
  renderTrigger: PropTypes.func,
  className: PropTypes.string,
  onClickOk: PropTypes.func,
  onClickCancel: PropTypes.func,
  open: PropTypes.bool,
}

ConfirmationPopin.defaultProps = {
  title: undefined,
  subtitle: undefined,
  children: undefined,
  renderTrigger: undefined,
  className: undefined,
  onClickOk: undefined,
  onClickCancel: undefined,
  open: false,
}

export default ConfirmationPopin