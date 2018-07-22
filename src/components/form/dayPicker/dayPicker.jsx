import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { SingleDatePicker } from 'react-dates'
import { toDate } from 'helpers/firebase'

import './dayPicker.css'

class DayPicker extends React.Component {
  constructor(props) {
    super(props)
    const initialValue = toDate(props.value)
    this.state = {
      focused: false,
      date: initialValue ? moment(initialValue) : undefined,
    }
  }

  onDateChange = (date) => {
    this.setState({ date })
    this.props.onChange(date ? date.toDate() : undefined)
  }

  onFocusChange = ({ focused }) => {
    this.setState({ focused })
  }

  render() {
    const { focused, date } = this.state
    const { id } = this.props
    return (
      <SingleDatePicker
        id={id}
        date={date}
        focused={focused}
        onDateChange={this.onDateChange}
        onFocusChange={this.onFocusChange}
        numberOfMonths={1}
        hideKeyboardShortcutsPanel
        readOnly
        displayFormat="MMMM Do YYYY"
        isOutsideRange={() => false}
        customInputIcon={<i className="fa fa-calendar" />}
        navNext={<i className="fa fa-arrow-right" />}
        navPrev={<i className="fa fa-arrow-left" />}
      />
    )
  }
}

DayPicker.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.number]),
}

DayPicker.defaultProps = {
  value: undefined,
}

export default DayPicker
