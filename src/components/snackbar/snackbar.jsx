import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import OpenTrigger from 'components/portals/openTrigger'
import Button from 'components/button'
import CloseIcon from 'components/icons/close'

import './snackbar.css'

const Snackbar = ({
  content,
  defaultOpen,
  closable,
  success,
  warning,
  error,
  onOpen,
  onClose,
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
          {closable && (
            <Button icon onClick={hide}>
              <CloseIcon />
            </Button>
          )}
        </div>
      </div>
    )}
  </OpenTrigger>
)

Snackbar.propTypes = {
  content: PropTypes.node.isRequired,
  defaultOpen: PropTypes.bool,
  closable: PropTypes.bool,
  success: PropTypes.bool,
  warning: PropTypes.bool,
  error: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  renderTrigger: PropTypes.func,
  className: PropTypes.string,
}

Snackbar.defaultProps = {
  defaultOpen: false,
  closable: true,
  success: false,
  warning: false,
  error: false,
  onOpen: undefined,
  onClose: undefined,
  renderTrigger: undefined,
  className: undefined,
}

export default Snackbar
