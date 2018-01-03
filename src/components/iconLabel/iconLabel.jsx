import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import './iconLabel.css'

const IconLabel = ({ icon, label, className }) => (
  <span className={cn(className, 'icon-label')}>
    <span>
      <i className={icon} />
    </span>
    <span className="icon-label-label">{label}</span>
  </span>
)

IconLabel.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
  className: PropTypes.string,
}

IconLabel.defaultProps = {
  className: undefined,
}

export default IconLabel
