import React from 'react'
import PropTypes from 'prop-types'

import './stepSpace.css'

const StepSpace = ({ step, current }) => {
  const stepSpaceClasses = (s, c) => {
    if (s === c) {
      return 'step-space space-active-to-default'
    } else if (s < c - 1) {
      return 'step-space space-success'
    } else if (s < c) {
      return 'step-space space-success-to-active'
    }
    return 'step-space'
  }
  return <div className={stepSpaceClasses(step, current)} />
}

StepSpace.propTypes = {
  step: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
}

export default StepSpace
