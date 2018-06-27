import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Portal from 'components/portals/portal'
import Backdrop from 'components/portals/backdrop'
import OpenTrigger from 'components/helpers/openTrigger'

import './modal.css'

const Modal = ({
  children,
  onClose,
  withClickOutside,
  withEscapeClose,
  withCloseIcon,
  className,
  defaultOpen,
  renderTrigger,
}) => (
  <OpenTrigger
    defaultOpen={defaultOpen}
    renderTrigger={renderTrigger}
    withEscapeClose={withEscapeClose}
    onClose={onClose}
  >
    {({ hide, show, isOpen }) => (
      <Portal>
        <Backdrop onClick={hide} withClickOutside={withClickOutside} />
        <div className={cn('modal', className)}>
          {children({ hide, show, isOpen })}
          {withCloseIcon && (
            <div className="modal-close" onClick={hide} role="button">
              <i className="fa fa-times fa-fw fa-2x" />
            </div>
          )}
        </div>
      </Portal>
    )}
  </OpenTrigger>
)

Modal.propTypes = {
  children: PropTypes.func.isRequired,
  defaultOpen: PropTypes.bool,
  renderTrigger: PropTypes.func,
  onClose: PropTypes.func,
  withClickOutside: PropTypes.bool,
  withEscapeClose: PropTypes.bool,
  withCloseIcon: PropTypes.bool,
  className: PropTypes.string,
}

Modal.defaultProps = {
  defaultOpen: false,
  renderTrigger: undefined,
  onClose: undefined,
  withClickOutside: true,
  withEscapeClose: true,
  withCloseIcon: true,
  className: undefined,
}

export default Modal
