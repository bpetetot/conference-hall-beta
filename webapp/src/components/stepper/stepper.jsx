/* eslint-disable react/no-array-index-key */
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import Step from './step'
import StepLabel from './stepLabel'
import StepSpace from './stepSpace'
import './stepper.css'

const Stepper = ({ steps, currentStep }) => (
  <div className="stepper">
    <div className="steps-labels">
      {steps.map((step, i) => (
        <StepLabel key={i} label={step.label} step={i} current={currentStep} />
      ))}
    </div>
    <div className="steps-icons">
      {steps.map((step, i) => (
        <Fragment key={i}>
          <Step icon={step.icon} step={i} current={currentStep} />
          {i !== steps.length - 1 && <StepSpace step={i} current={currentStep} />}
        </Fragment>
      ))}
    </div>
  </div>
)

Stepper.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      icon: PropTypes.string,
    }),
  ).isRequired,
  currentStep: PropTypes.number.isRequired,
}

export default Stepper
