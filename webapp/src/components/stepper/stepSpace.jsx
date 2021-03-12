import React from 'react'
import PropTypes from 'prop-types'

import './stepSpace.css'

const StepSpace = ({ step, current }) => {
  const stepSpaceClasses = (s, c) => {
    if (s === c) return 'step-space space-active-to-default'
    if (s < c - 1) return 'step-space space-success'
    if (s < c) return 'step-space space-success-to-active'
    return 'step-space'
  }
  return <div className={stepSpaceClasses(step, current)} role="presentation" />
}

StepSpace.propTypes = {
  step: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
}

export default StepSpace
