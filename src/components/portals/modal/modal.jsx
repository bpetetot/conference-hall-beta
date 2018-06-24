/* eslint-disable no-return-assign */
import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Portal from 'components/portals/portal'
import Backdrop from 'components/portals/backdrop'
import './modal.css'

const Modal = ({
  onClose, children, withCloseIcon, className,
}) => (
  <Portal>
    <Backdrop onClick={onClose} />
    <div className={cn('modal', className)}>
      {children}
      {withCloseIcon && (
        <div className="modal-close" onClick={onClose} role="button">
          <i className="fa fa-times fa-fw fa-2x" />
        </div>
      )}
    </div>
  </Portal>
)

Modal.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.node]).isRequired,
  withCloseIcon: PropTypes.bool,
  className: PropTypes.string,
}

Modal.defaultProps = {
  onClose: undefined,
  className: undefined,
  withCloseIcon: true,
}

export default Modal
