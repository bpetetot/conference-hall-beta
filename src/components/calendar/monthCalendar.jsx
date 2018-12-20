import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import {
  parse, format, getDaysInMonth, startOfMonth, getDay, addMonths,
} from 'date-fns'
import range from 'lodash/range'
import chunk from 'lodash/chunk'
import isString from 'lodash/isString'
import add from 'lodash/fp/add'
import Button from '../button'
import Modal from '../portals/modal'
import { List, ListItem } from '../list'

import './monthCalendar.css'

class MonthCalendar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      offset: 0,
    }
  }

  setOffset = offset => () => this.setState({ offset })

  renderDayItem = (customClassName = () => null) => (item, index) => (
    <div key={item} className={`cc-day-item ${customClassName(index)}`}><span>{item}</span></div>
  )

  renderDayContent = (date) => {
    const content = this.props.renderDay(date)
    if (Array.isArray(content)) {
      content.forEach((item) => {
        if (!isString(item)) throw new Error('renderDay should return a string or an array of string')
      })

      if (content.length > 3) {
        const modal = (
          <Modal
            className="default-theme"
            renderTrigger={({ show }) => (
              <Button simple onClick={show}>{content.length - 2} other elements</Button>
            )}
          >
            {() => (
              <List
                array={content}
                renderRow={item => (
                  <ListItem
                    key={item}
                    title={item}
                  />
                )}
              />
            )}
          </Modal>
        )
        const directlyRendered = content.slice(0, 2)
        directlyRendered.push(modal)

        // eslint-disable-next-line no-confusing-arrow
        const makeLastElementWhite = index => index === 2 ? 'cc-day-item-white' : null
        return directlyRendered.map(this.renderDayItem(makeLastElementWhite))
      }

      return content.map(this.renderDayItem())
    }

    if (isString(content)) {
      return this.renderDayItem()(content)
    }

    return null
  }

  render() {
    const { date, onDayClick } = this.props
    const parsedDate = addMonths(parse(date), this.state.offset)
    const startDay = getDay(startOfMonth(parsedDate))
    const preFillOffset = startDay === 0 ? 0 : startDay - 1

    const weeks = chunk([
      ...Array(preFillOffset).fill(null),
      ...range(getDaysInMonth(parsedDate)).map(add(1)),
    ], 7)

    const lastWeek = weeks[weeks.length - 1]
    const fillOffset = 7 - lastWeek.length
    weeks[weeks.length - 1] = [
      ...lastWeek,
      ...Array(fillOffset).fill(null),
    ]

    return (
      <div className="cc-calendar">
        <div className="cc-calendar-header">
          <span className="cc-month">{format(parsedDate, 'MMMM YYYY')}</span>
          <div className="cc-buttons">
            <Button
              secondary
              onClick={this.setOffset(this.state.offset - 1)}
            >
              Previous
            </Button>
            <Button
              primary
              onClick={this.setOffset(0)}
            >
              Today
            </Button>
            <Button
              secondary
              onClick={this.setOffset(this.state.offset + 1)}
            >
              Next
            </Button>
          </div>
        </div>
        <div className="cc-weeks">
          {weeks.map(days => (
            <div key={days.join('')} className="cc-week">
              {days.map((day, index) => {
                const dayDate = new Date(day, parsedDate.getMonth(), parsedDate.getFullYear())
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
  date: PropTypes.string,
  renderDay: PropTypes.func,
  onDayClick: PropTypes.func,
}

MonthCalendar.defaultProps = {
  date: format(new Date(), 'MM/DD/YYYY'),
  renderDay: () => null,
  onDayClick: () => null,
}

export default MonthCalendar
