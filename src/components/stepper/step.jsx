import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import './step.css'

function Step({ icon, step, current }) {
  const stepIcon = (i, s, c) => cn({ [i]: s >= c, 'fa fa-check': s < c })
  const stepClasses = (s, c) => cn('step-icon', { 'step-active': s === c, 'step-success': s < c })

  return (
    <div className={stepClasses(step, current)} role="presentation">
      <i className={stepIcon(icon, step, current)} />
    </div>
  )
}

Step.propTypes = {
  icon: PropTypes.string.isRequired,
  step: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
}

export default Step
