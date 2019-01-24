import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import format from 'date-fns/format'
import getDaysInMonth from 'date-fns/get_days_in_month'
import startOfMonth from 'date-fns/start_of_month'
import getDay from 'date-fns/get_day'
import addMonths from 'date-fns/add_months'
import { set } from 'immutadot'
import range from 'lodash/range'
import chunk from 'lodash/chunk'
import isString from 'lodash/isString'
import add from 'lodash/fp/add'
import Button from '../button'
import DayModal from './dayModal'

import './monthCalendar.css'

class MonthCalendar extends Component {
  state = {
    offset: 0,
  }

  goToPreviousMonth = () => this.setState(state => ({ offset: state.offset - 1 }))

  gotToNextMonth = () => this.setState(state => ({ offset: state.offset + 1 }))

  goToToday = () => this.setState({ offset: 0 })

  renderDayItem = (item, customClassName = '') => (
    <div key={item} className={cn('cc-day-item', customClassName)}><span>{item}</span></div>
  )

  renderDayContent = (date) => {
    const content = this.props.renderDay(date)
    if (Array.isArray(content)) {
      content.forEach((item) => {
        if (!isString(item)) throw new Error('renderDay should return a string or an array of string')
      })

      if (content.length > 3) {
        const modal = (<DayModal content={content} />)
        const directlyRendered = content.slice(0, 2)
        directlyRendered.push(modal)

        return directlyRendered.map((item, index) => this.renderDayItem(item, index === 2 ? 'cc-day-item-white' : undefined))
      }

      return content.map(item => this.renderDayItem(item))
    }

    if (isString(content)) {
      return this.renderDayItem(content)
    }

    return null
  }

  generateWeeksForMonth = (date) => {
    const startDay = getDay(startOfMonth(date))

    const weeks = chunk([
      ...Array(startDay).fill(null),
      ...range(getDaysInMonth(date)).map(add(1)),
    ], 7)

    const lastWeek = weeks[weeks.length - 1]
    const fillOffset = 7 - lastWeek.length

    return set(weeks, weeks.length - 1, [
      ...lastWeek,
      ...Array(fillOffset).fill(null),
    ])
  }

  render() {
    const { date, onDayClick } = this.props
    const parsedDate = addMonths(date, this.state.offset)

    const weeks = this.generateWeeksForMonth(parsedDate)

    return (
      <div className="cc-calendar">
        <div className="cc-calendar-header">
          <span className="cc-month">{format(parsedDate, 'MMMM YYYY')}</span>
          <div className="cc-buttons">
            <Button
              secondary
              onClick={this.goToPreviousMonth}
            >
              Previous
            </Button>
            <Button
              primary
              onClick={this.goToToday}
            >
              Today
            </Button>
            <Button
              secondary
              onClick={this.gotToNextMonth}
            >
              Next
            </Button>
          </div>
        </div>
        <div className="cc-weeks">
          {weeks.map(days => (
            <div key={days.join('')} className="cc-week">
              {days.map((day, index) => {
                const dayDate = new Date(parsedDate.getFullYear(), parsedDate.getMonth(), day)
                return (
                  <div
                    key={day === null ? index : dayDate}
                    role="button"
                    className={cn({ 'cc-day': day !== null })}
                    onClick={() => onDayClick(dayDate)}
                  >
                    {day !== null && (
                      <Fragment>
                        <div className="cc-day-number">{day}</div>
                        <div className="cc-day-content">
                          {this.renderDayContent(dayDate)}
                        </div>
                      </Fragment>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

MonthCalendar.propTypes = {
  date: PropTypes.instanceOf(Date),
  renderDay: PropTypes.func,
  onDayClick: PropTypes.func,
}

MonthCalendar.defaultProps = {
  date: new Date(),
  renderDay: () => null,
  onDayClick: () => null,
}

export default MonthCalendar
