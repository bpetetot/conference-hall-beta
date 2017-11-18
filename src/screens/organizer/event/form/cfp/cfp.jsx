import React from 'react'
import forRoute from 'hoc-little-router'
import DayPicker from 'components/form/dayPicker'
import DayRangePicker from 'components/form/dayPicker/dayRangePicker'

import './cfp.css'

const CFPForm = () => (
  <div className="cfp-form">
    <div>
      <DayPicker />
    </div>
    <br />
    <div>
      <DayRangePicker />
    </div>
  </div>
)

export default forRoute('EDIT_EVENT_CFP')(CFPForm)
