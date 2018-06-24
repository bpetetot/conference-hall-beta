/* eslint-disable no-return-assign */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Portal from 'components/portal'
import './modal.css'

class Modal extends Component {
  componentDidMount() {
    if (this.props.withClickOutside) {
      document.addEventListener('mousedown', this.handleClickOutside)
    }
  }

  componentWillUnmount() {
    if (this.props.withClickOutside) {
      document.removeEventListener('mousedown', this.handleClickOutside)
    }
  }

  handleClickOutside = (e) => {
    if (this.modal && !this.modal.contains(e.target)) {
      this.props.onClose(e)
    }
  }

  render() {
    const {
      open, onClose, children, withCloseIcon, className,
    } = this.props
    if (!open) return null
    return (
      <Portal className="modal">
        <div ref={e => (this.modal = e)} className={cn('modal-content', className)}>
          {children}
          {withCloseIcon && (
            <div className="modal-close" onClick={onClose} role="button">
              <i className="fa fa-times fa-fw fa-2x" />
            </div>
          )}
        </div>
      </Portal>
    )
  }
}

Modal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.node]).isRequired,
  withCloseIcon: PropTypes.bool,
  withClickOutside: PropTypes.bool,
  className: PropTypes.string,
}

Modal.defaultProps = {
  open: false,
  onClose: undefined,
  className: undefined,
  withCloseIcon: true,
  withClickOutside: true,
}

export default Modal
