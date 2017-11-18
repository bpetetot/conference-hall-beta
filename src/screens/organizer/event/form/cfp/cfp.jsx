import React from 'react'
import forRoute from 'hoc-little-router'
import DayPicker from 'components/form/dayPicker'

import './cfp.css'

const CFPForm = () => (
  <div className="cfp-form">
    <div>
      <DayPicker />
    </div>
  </div>
)

export default forRoute('EDIT_EVENT_CFP')(CFPForm)
