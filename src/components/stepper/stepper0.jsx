import React from 'react'

import Step from './step'
import StepSpace from './stepSpace'
import './stepper.css'

const Stepper = () => (
  <div className="stepper">
    <Step icon="fa fa-check" label="Select a talk" className="step-first step-active" />
    <StepSpace className="space-active-to-default" />
    <Step icon="fa fa-list" label="Talk classification" className="step-default" />
    <StepSpace />
    <Step icon="fa fa-paper-plane" label="Talk submitted" className="step-last" />
  </div>
)

export default Stepper
