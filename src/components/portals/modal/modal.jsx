import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Portal from 'components/portals/portal'
import OpenTrigger from 'components/portals/openTrigger'
import Backdrop from 'components/portals/backdrop'

import './modal.css'

class Modal extends Component {
  handleClose = hide => () => {
    if (this.props.onClose) this.props.onClose()
    hide()
  }

  render() {
    const {
      children,
      onClose,
      withClickOutside,
      withEscapeClose,
      withCloseIcon,
      className,
      defaultOpen,
      renderTrigger,
    } = this.props

    return (
      <OpenTrigger
        defaultOpen={defaultOpen}
        renderTrigger={renderTrigger}
        withEscapeClose={withEscapeClose}
        onClose={onClose}
      >
        {({ hide, show, isOpen }) => (
          <Portal>
            <Backdrop onClick={this.handleClose(hide)} withClickOutside={withClickOutside} />
            <div className={cn('modal', className)}>
              {children({ hide, show, isOpen })}
              {withCloseIcon && (
                <div className="modal-close" onClick={this.handleClose(hide)} role="button">
                  <i className="fa fa-times fa-fw fa-2x" />
                </div>
              )}
            </div>
          </Portal>
        )}
      </OpenTrigger>
    )
  }
}

Modal.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.func.isRequired,
  withClickOutside: PropTypes.bool,
  withEscapeClose: PropTypes.bool,
  withCloseIcon: PropTypes.bool,
  className: PropTypes.string,
  defaultOpen: PropTypes.bool,
  renderTrigger: PropTypes.func,
}

Modal.defaultProps = {
  onClose: undefined,
  className: undefined,
  withClickOutside: true,
  withEscapeClose: true,
  withCloseIcon: true,
  defaultOpen: false,
  renderTrigger: undefined,
}

export default Modal
