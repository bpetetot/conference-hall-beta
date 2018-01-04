import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { DateRangePicker } from 'react-dates'

import './dayRangePicker.css'

let START_DATE = 'START_DATE_ID'
let END_DATE = 'END_DATE_ID'

class DayRangePicker extends React.Component {
  constructor(props) {
    super(props)
    const { value } = props
    this.state = {
      focusedInput: undefined,
      start: value && value.start ? moment(value.start) : undefined,
      end: value && value.end ? moment(value.end) : undefined,
    }
  }

  componentWillMount() {
    const { id } = this.props
    START_DATE += `${id}Start`
    END_DATE += `${id}End`
  }

  onDatesChange = ({ startDate, endDate }) => {
    this.setState({ start: startDate, end: endDate })
    this.props.onChange({
      start: startDate ? startDate.toDate() : undefined,
      end: endDate ? endDate.toDate() : undefined,
    })
  }

  onFocusChange = (focusedInput) => {
    this.setState({ focusedInput })
  }

  render() {
    const { focusedInput, start, end } = this.state
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
          startDate={start}
          endDate={end}
          minimumNights={0}
          isOutsideRange={() => false}
          customInputIcon={<i className="fa fa-calendar" />}
          customArrowIcon={<i className="fa fa-arrow-right" />}
          navNext={<i className="fa fa-arrow-right" />}
          navPrev={<i className="fa fa-arrow-left" />}
        />
      </div>
    )
  }
}

DayRangePicker.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.object, // eslint-disable-line react/forbid-prop-types
}

DayRangePicker.defaultProps = {
  value: undefined,
}

export default DayRangePicker
