import React from 'react'
import moment from 'moment'
import { SingleDatePicker } from 'react-dates'

import './dayPicker.css'

class DayPicker extends React.Component {
  state = {
    focused: false,
    date: moment(),
  }

  onDateChange = (date) => {
    this.setState({ date })
  }

  onFocusChange = ({ focused }) => {
    this.setState({ focused })
  }

  render() {
    const { focused, date } = this.state

    return (
      <SingleDatePicker
        id="date_input"
        date={date}
        focused={focused}
        onDateChange={this.onDateChange}
        onFocusChange={this.onFocusChange}
        numberOfMonths={1}
        hideKeyboardShortcutsPanel
        readOnly
        displayFormat="dddd, MMMM Do YYYY"
        customInputIcon={<i className="fa fa-calendar" />}
      />
    )
  }
}

export default DayPicker
