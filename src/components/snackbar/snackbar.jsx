import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Timer from 'components/helpers/timer'
import OpenTrigger from 'components/helpers/openTrigger'
import Button from 'components/button'
import CloseIcon from 'components/icons/close'

import './snackbar.css'

const Snackbar = ({
  content,
  defaultOpen,
  success,
  warning,
  error,
  onOpen,
  onClose,
  autoClose,
  withCloseIcon,
  delay,
  renderTrigger,
  className,
}) => (
  <OpenTrigger
    defaultOpen={defaultOpen}
    renderTrigger={renderTrigger}
    withEscapeClose={false}
    onOpen={onOpen}
    onClose={onClose}
  >
    {({ hide }) => (
      <Timer enabled={autoClose} onFinish={hide} delay={delay}>
        <div
          className={cn(
            'cc-snackbar',
            {
              'cc-snackbar-success': success,
              'cc-snackbar-warning': warning,
              'cc-snackbar-error': error,
            },
            className,
          )}
        >
          <div className="cc-snackbar-content">{content}</div>
          <div className="cc-snackbar-actions">
            {withCloseIcon && (
              <Button icon onClick={hide}>
                <CloseIcon />
              </Button>
            )}
          </div>
        </div>
      </Timer>
    )}
  </OpenTrigger>
)

Snackbar.propTypes = {
  content: PropTypes.node.isRequired,
  defaultOpen: PropTypes.bool,
  success: PropTypes.bool,
  warning: PropTypes.bool,
  error: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  autoClose: PropTypes.bool,
  delay: PropTypes.number,
  withCloseIcon: PropTypes.bool,
  renderTrigger: PropTypes.func,
  className: PropTypes.string,
}

Snackbar.defaultProps = {
  defaultOpen: false,
  success: false,
  warning: false,
  error: false,
  onOpen: undefined,
  onClose: undefined,
  autoClose: false,
  delay: 10000,
  withCloseIcon: true,
  renderTrigger: undefined,
  className: undefined,
}

export default Snackbar
