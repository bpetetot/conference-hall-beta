import React from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import { toDate } from 'helpers/firebase'

class DayRangePicker extends React.Component {
  constructor(props) {
    super(props)
    const { value = {} } = props
    const start = toDate(value.start)
    const end = toDate(value.end)

    this.state = {
      start: start || undefined,
      end: end || undefined,
    }
  }

  onStartChange = (start) => {
    this.setState((state) => {
      const end = state.end || start
      this.props.onChange({ start, end })
      return { start, end }
    })
  }

  onEndChange = (end) => {
    this.setState((state) => {
      const start = state.start || end
      this.props.onChange({ start, end })
      return { start, end }
    })
  }

  render() {
    const { start, end } = this.state
    const { id } = this.props

    return (
      <div>
        <DatePicker
          id={`${id}-start`}
          selected={start}
          startDate={start}
          endDate={end}
          selectsStart
          onChange={this.onStartChange}
          dateFormat="MMMM do YYYY"
          todayButton="Today"
          placeholderText="Start date"
          fixedHeight
        />
        <i className="fa fa-arrow-right" />
        <DatePicker
          id={`${id}-end`}
          selected={end}
          startDate={start}
          endDate={end}
          selectsEnd
          onChange={this.onEndChange}
          dateFormat="MMMM do YYYY"
          todayButton="Today"
          placeholderText="End date"
          fixedHeight
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
