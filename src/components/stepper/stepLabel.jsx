import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import './stepLabel.css'

function StepLabel({ label, step, current }) {
  const labelClasses = (s, c) => cn({ 'step-active-label': s === c, 'step-success-label': s < c })

  return <div className={labelClasses(step, current)}>{label}</div>
}

StepLabel.propTypes = {
  label: PropTypes.string.isRequired,
  step: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
}

export default StepLabel
