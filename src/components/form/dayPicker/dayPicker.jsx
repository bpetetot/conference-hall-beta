import React from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import { toDate } from 'helpers/firebase'
import { withSizes } from 'styles/utils'

class DayPicker extends React.Component {
  constructor(props) {
    super(props)
    const date = toDate(props.value)
    this.state = {
      date: date || undefined,
    }
  }

  onDateChange = (date) => {
    this.setState({ date })
    this.props.onChange(date)
  }

  render() {
    const { date } = this.state
    const { id, isMobile, isTablet } = this.props

    return (
      <DatePicker
        id={id}
        selected={date}
        onChange={this.onDateChange}
        dateFormat="MMMM do YYYY"
        placeholderText="Date"
        withPortal={isMobile || isTablet}
        calendarClassName="day-picker-custom"
      />
    )
  }
}

DayPicker.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.number]),
  isMobile: PropTypes.bool.isRequired,
  isTablet: PropTypes.bool.isRequired,
}

DayPicker.defaultProps = {
  value: undefined,
}

export default withSizes(DayPicker)
