import React from 'react'

import { DateRangePicker } from 'react-dates'

import './dayRangePicker.css'

const START_DATE = 'START_DATE_ID'
const END_DATE = 'END_DATE_ID'

class DayRangePicker extends React.Component {
  state = {
    focusedInput: undefined,
  }

  onDatesChange = ({ startDate, endDate }) => {
    this.setState({ startDate, endDate })
  }

  onFocusChange = (focusedInput) => {
    this.setState({ focusedInput })
  }

  render() {
    const { focusedInput, startDate, endDate } = this.state
    return (
      <div>
        <DateRangePicker
          startDateId={START_DATE}
          startDatePlaceholderText="Start Date"
          endDateId={END_DATE}
          endDatePlaceholderText="End Date"
          numberOfMonths={1}
          hideKeyboardShortcutsPanel
          readOnly
          displayFormat="MMMM Do YYYY"
          onDatesChange={this.onDatesChange}
          onFocusChange={this.onFocusChange}
          focusedInput={focusedInput}
          startDate={startDate}
          endDate={endDate}
          minimumNights={0}
          customInputIcon={<i className="fa fa-calendar" />}
          customArrowIcon={<i className="fa fa-arrow-right" />}
          navNext={<i className="fa fa-arrow-right" />}
          navPrev={<i className="fa fa-arrow-left" />}
        />
      </div>
    )
  }
}

export default DayRangePicker
