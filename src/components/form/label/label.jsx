import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Tooltip from 'components/tooltip/tooltip'
import './label.css'

const Label = ({
  name, label, tooltip, className, children, error, classNameInput,
}) => (
  <div className={cn('form-label', { 'form-has-error': !!error }, className)}>
    {label && (
      <label className="form-label-label" htmlFor={name}>
        <span>{label}</span>
        {tooltip && (
          <Tooltip className="tooltip" tooltip={tooltip} inline>
            <span>
              <i className="fa fa-info-circle" />
            </span>
          </Tooltip>
        )}
      </label>
    )}
    <div className={classNameInput}>
      {children}
      {error && <div className="form-error">{error || ''}</div>}
    </div>
  </div>
)

Label.propTypes = {
  label: PropTypes.string,
  tooltip: PropTypes.string,
  children: PropTypes.node.isRequired,
  name: PropTypes.string,
  error: PropTypes.string,
  className: PropTypes.string,
  classNameInput: PropTypes.string,
}

Label.defaultProps = {
  label: undefined,
  tooltip: undefined,
  name: undefined,
  error: undefined,
  className: undefined,
  classNameInput: undefined,
}

export default Label
