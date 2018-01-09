import React from 'react'

import Step from './step'
import StepSpace from './stepSpace'
import './stepper.css'

const Stepper = () => (
  <div className="stepper">
    <Step icon="fa fa-check" label="Select a talk" className="step-first step-success" />
    <StepSpace className="space-success" />
    <Step icon="fa fa-check" label="Talk classification" className="step-success" />
    <StepSpace className="space-success" />
    <Step icon="fa fa-check" label="Talk submitted" className="step-last step-success" />
  </div>
)

export default Stepper
