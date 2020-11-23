import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Modal from 'components/portals/modal'
import Button from 'components/button'
import useTheme from 'styles/themes/useTheme'

import './confirmation.css'

function ConfirmationPopin({
  className,
  title,
  content,
  onOk,
  withOk,
  onCancel,
  withCancel,
  renderTrigger,
  defaultOpen,
}) {
  const theme = useTheme()

  const handleOk = useCallback(
    (hide) => (e) => {
      hide()
      if (onOk) onOk(e)
    },
    [onOk],
  )

  const handleCancel = useCallback(
    (hide) => (e) => {
      hide()
      if (onCancel) onCancel(e)
    },
    [onCancel],
  )

  return (
    <Modal
      defaultOpen={defaultOpen}
      renderTrigger={renderTrigger}
      onClose={handleCancel}
      withCloseIcon={false}
      withClickOutside={false}
      withEscapeClose={false}
      className={cn('confirmation-popin', theme, className)}
    >
      {({ hide }) => (
        <>
          <div className="confirmation-text" aria-describedby={title}>
            {title && <div className="confirmation-title">{title}</div>}
            {content && <div className="confirmation-content">{content}</div>}
          </div>
          <div className="confirmation-actions">
            {(withCancel || onCancel) && (
              <Button secondary onClick={handleCancel(hide)}>
                Cancel
              </Button>
            )}
            {(withOk || onOk) && (
              <Button accent onClick={handleOk(hide)}>
                Ok
              </Button>
            )}
          </div>
        </>
      )}
    </Modal>
  )
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
