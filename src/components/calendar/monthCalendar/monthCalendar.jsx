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
import Button from '../../button'
import Drawer from '../../portals/drawer'
import DayModal from './dayModal'

import './monthCalendar.css'

class MonthCalendar extends Component {
  state = {
    offset: 0,
  }

  goToPreviousMonth = () => this.setState(state => ({ offset: state.offset - 1 }))

  gotToNextMonth = () => this.setState(state => ({ offset: state.offset + 1 }))

  goToToday = () => this.setState({ offset: 0 })

  renderDayItem = (item, form, customClassName = '') => (
    <Drawer
      className="default-theme"
      actions={({ hide }) => <Button onClick={hide}>Close</Button>}
      renderTrigger={({ show }) => (
        <div
          role="button"
          onClick={(e) => {
            e.stopPropagation()
            show()
          }}
          key={item}
          className={cn('cc-month-day-item', customClassName)}
        >
          <span>{item}</span>
        </div>
      )}
    >
      {form}
    </Drawer>

  )

  renderDayContent = (date) => {
    const content = this.props.renderDay(date)
    const makeForm = index => this.props.renderUpdateEvent(date, index)
    if (Array.isArray(content)) {
      content.forEach((item) => {
        if (!isString(item)) throw new Error('renderDay should return a string or an array of string')
      })

      if (content.length > 3) {
        const modal = (<DayModal content={content} />)
        const directlyRendered = content.slice(0, 2)
        directlyRendered.push(modal)

        return directlyRendered.map((item, index) => this.renderDayItem(item, makeForm(index), index === 2 ? 'cc-month-day-item-white' : undefined))
      }

      return content.map((item, index) => this.renderDayItem(item, makeForm(index)))
    }

    if (isString(content)) {
      return this.renderDayItem(content, makeForm(0))
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
    const { date, addEventTitle, renderAddEvent } = this.props
    const parsedDate = addMonths(date, this.state.offset)

    const weeks = this.generateWeeksForMonth(parsedDate)

    return (
      <div className="cc-month-calendar">
        <div className="cc-month-calendar-header">
          <span className="cc-month-month">{format(parsedDate, 'MMMM YYYY')}</span>
          <div className="cc-month-buttons">
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
        <div className="cc-month-weeks">
          {weeks.map(days => (
            <div key={days.join('')} className="cc-month-week">
              {days.map((day, index) => {
                const dayDate = new Date(parsedDate.getFullYear(), parsedDate.getMonth(), day)
                return (
                  <Drawer
                    title={addEventTitle}
                    className="default-theme"
                    actions={({ hide }) => <Button onClick={hide}>Close</Button>}
                    renderTrigger={({ show }) => (
                      <div
                        key={day === null ? index : dayDate}
                        role="button"
                        className={cn({ 'cc-month-day': day !== null })}
                        onClick={(e) => {
                          const node = e.target
                          const attributeName = 'role'
                          const hasNodeAButtonRole = node.hasAttribute(attributeName) && node.getAttribute(attributeName) === 'button'
                          const hasParentNodeAButtonRole = node.parentNode.hasAttribute(attributeName) && node.parentNode.getAttribute(attributeName) === 'button'
                          if (!hasNodeAButtonRole && !hasParentNodeAButtonRole) return
                          show()
                        }}
                      >
                        {day !== null && (
                          <Fragment>
                            <div className="cc-month-day-number">{day}</div>
                            <div className="cc-month-day-content">
                              {this.renderDayContent(dayDate)}
                            </div>
                          </Fragment>
                        )}
                      </div>
                    )}
                  >
                    {renderAddEvent(dayDate)}
                  </Drawer>
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
  renderAddEvent: PropTypes.func,
  renderUpdateEvent: PropTypes.func,
  addEventTitle: PropTypes.string,
}

MonthCalendar.defaultProps = {
  date: new Date(),
  renderDay: () => null,
  renderAddEvent: () => null,
  renderUpdateEvent: () => null,
  addEventTitle: '',
}

export default MonthCalendar
