import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import './iconLabel.css'

const IconLabel = ({ icon, label, className }) => (
  <span className={cn(className, 'icon-label')}>
    <span>
      <i className={icon} />
    </span>
    <span>{label}</span>
  </span>
)

IconLabel.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
}

IconLabel.defaultProps = {
  className: undefined,
}

export default IconLabel
