import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import './iconLabel.css'

const IconLabel = ({
  icon, label, right, overflow, className,
}) => {
  if (!label) return null
  return (
    <span className={cn(className, 'icon-label', { 'icon-label-right': right })}>
      {!right && icon && (
        <span>
          <i className={icon} />
        </span>
      )}
      <span className={cn({ 'icon-label-overflow': overflow })}>{label}</span>
      {right && icon && (
        <span>
          <i className={icon} />
        </span>
      )}
    </span>
  )
}

IconLabel.propTypes = {
  icon: PropTypes.string,
  label: PropTypes.node,
  right: PropTypes.bool,
  overflow: PropTypes.bool,
  className: PropTypes.string,
}

IconLabel.defaultProps = {
  icon: undefined,
  label: undefined,
  className: undefined,
  right: false,
  overflow: false,
}

export default IconLabel
