import React from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import { toDate } from 'helpers/firebase'
import { withSizes } from 'styles/utils'

export class DayPicker extends React.Component {
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
    const {
      id, isMobile, isTablet, dateFormat, className, placeholderText,
    } = this.props

    return (
      <DatePicker
        id={id}
        selected={date}
        onChange={this.onDateChange}
        dateFormat={dateFormat}
        placeholderText={placeholderText}
        withPortal={isMobile || isTablet}
        className={className}
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
  dateFormat: PropTypes.string,
  className: PropTypes.string,
  placeholderText: PropTypes.string,
}

DayPicker.defaultProps = {
  value: undefined,
  dateFormat: 'MMMM do YYYY',
  className: undefined,
  placeholderText: undefined,
}

export default withSizes(DayPicker)
