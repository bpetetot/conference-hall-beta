import React, { useState } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import getDaysInMonth from 'date-fns/getDaysInMonth'
import startOfMonth from 'date-fns/startOfMonth'
import getDay from 'date-fns/getDay'
import isSameDay from 'date-fns/isSameDay'
import { set } from 'immutadot'
import range from 'lodash/range'
import chunk from 'lodash/chunk'
import isString from 'lodash/isString'
import add from 'lodash/fp/add'
import DayModal from './dayModal'

import Navigator from '../navigator'
import './monthCalendar.css'

const TODAY = new Date()

function generateWeeksForMonth(date) {
  const startDay = getDay(startOfMonth(date))

  const weeks = chunk(
    [...Array(startDay).fill(null), ...range(getDaysInMonth(date)).map(add(1))],
    7,
  )

  const lastWeek = weeks[weeks.length - 1]
  const fillOffset = 7 - lastWeek.length

  return set(weeks, weeks.length - 1, [...lastWeek, ...Array(fillOffset).fill(null)])
}

const MonthCalendar = ({ date, onClickDay, onClickItem, renderDay }) => {
  const [currentDate, setCurrentDate] = useState(date)

  const renderDayContent = dayDate => {
    if (!renderDay) return null

    const content = renderDay(dayDate)
    if (!content) return null

    if (Array.isArray(content)) {
      content.forEach(item => {
        if (!isString(item))
          throw new Error('renderDay should return a string or an array of string')
      })

      if (content.length > 3) {
        const modal = <DayModal content={content} />
        const directlyRendered = content.slice(0, 2)
        directlyRendered.push(modal)

        return directlyRendered.map((item, index) => (
          <div
            key={item}
            onClick={e => {
              e.stopPropagation()
              onClickItem(dayDate, index)
            }}
            role="button"
            className={cn('cc-month-day-item', { 'cc-month-day-item-white': index === 2 })}
          >
            {item}
          </div>
        ))
      }
      return content.map(item => (
        <div
          key={item}
          onClick={e => {
            e.stopPropagation()
            onClickItem(dayDate, 0)
          }}
          role="button"
          className="cc-month-day-item"
        >
          {item}
        </div>
      ))
    }

    return (
      <div key={content} className="cc-month-day-item">
        {content}
      </div>
    )
  }

  const weeks = generateWeeksForMonth(currentDate)

  return (
    <div className="cc-month-calendar">
      <Navigator type="month" date={currentDate} onChangeDate={setCurrentDate} />
      <div className="cc-month-weeks">
        {weeks.map(days => (
          <div key={days.join('')} className="cc-month-week">
            {days.map((day, index) => {
              const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
              return (
                <div
                  key={day === null ? index : dayDate}
                  className={cn({ 'cc-month-day': day !== null })}
                  onClick={e => {
                    e.stopPropagation()
                    onClickDay(dayDate)
                  }}
                  role="button"
                >
                  {day !== null && (
                    <>
                      <div
                        className={cn('cc-month-day-number', {
                          'cc-month-today': isSameDay(dayDate, TODAY),
                        })}
                      >
                        {day}
                      </div>
                      <div className="cc-month-day-content">{renderDayContent(dayDate)}</div>
                    </>
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

MonthCalendar.propTypes = {
  date: PropTypes.instanceOf(Date),
  renderDay: PropTypes.func,
  onClickDay: PropTypes.func,
  onClickItem: PropTypes.func,
}

MonthCalendar.defaultProps = {
  date: new Date(),
  renderDay: undefined,
  onClickDay: undefined,
  onClickItem: undefined,
}

export default MonthCalendar
