import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import DatePicker from 'react-datepicker'
import { toDate } from 'helpers/firebase'
import { withSizes } from 'styles/utils'
import isAfter from 'date-fns/is_after'

import styles from './dayRangePicker.module.css'

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

  handleChange = ({ start, end }) => {
    this.setState((state) => {
      let startDate = start || state.start
      let endDate = end || state.end

      if (startDate && !endDate) {
        endDate = startDate
      }
      if (!startDate && endDate) {
        startDate = endDate
      }
      if (isAfter(startDate, endDate)) {
        endDate = startDate
      }

      this.props.onChange({ start: startDate, end: endDate })
      return { start: startDate, end: endDate }
    })
  }

  handleChangeStart = start => this.handleChange({ start })

  handleChangeEnd = end => this.handleChange({ end })

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
    const { id, isMobile, isTablet } = this.props

    return (
      <div className={styles.dayRangePicker}>
        <DatePicker
          id={`${id}-start`}
          selected={start}
          startDate={start}
          endDate={end}
          selectsStart
          onChange={this.handleChangeStart}
          dateFormat="MMMM do YYYY"
          placeholderText="Start date"
          withPortal={isMobile || isTablet}
          calendarClassName="day-picker-custom"
        />

        <i className={cn(styles.arrow, 'fa fa-arrow-right')} />

        <DatePicker
          id={`${id}-end`}
          selected={end}
          startDate={start}
          endDate={end}
          minDate={start}
          selectsEnd
          onChange={this.handleChangeEnd}
          dateFormat="MMMM do YYYY"
          placeholderText="End date"
          withPortal={isMobile || isTablet}
          calendarClassName="day-picker-custom"
        />
      </div>
    )
  }
}

DayRangePicker.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.number]),
  isMobile: PropTypes.bool.isRequired,
  isTablet: PropTypes.bool.isRequired,
}

DayRangePicker.defaultProps = {
  value: undefined,
}

export default withSizes(DayRangePicker)
