import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import './iconLabel.css'

const IconLabel = ({
  icon, label, right, className,
}) => {
  if (!label) return null
  return (
    <span className={cn(className, 'icon-label', { 'icon-label-right': right })}>
      {!right && (
        <span>
          <i className={icon} />
        </span>
      )}
      <span className="icon-label-label">{label}</span>
      {right && (
        <span>
          <i className={icon} />
        </span>
      )}
    </span>
  )
}

IconLabel.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.node,
  right: PropTypes.bool,
  className: PropTypes.string,
}

IconLabel.defaultProps = {
  className: undefined,
  label: undefined,
  right: false,
}

export default IconLabel
