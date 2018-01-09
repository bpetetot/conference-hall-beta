import React from 'react'
import cn from 'classnames'

import './step.css'

const Step = ({ label, icon, className }) => (
  <div className={cn('step', className)}>
    <div className="icon-label">{label}</div>
    <div className="icon-step">
      <i className={icon} />
    </div>
  </div>
)

export default Step
