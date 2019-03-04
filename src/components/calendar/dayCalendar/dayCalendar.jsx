import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import uniq from 'lodash/uniq'
import format from 'date-fns/format'
import addDays from 'date-fns/add_days'
import isSameDay from 'date-fns/is_same_day'
import Button from '../../button'

import './dayCalendar.css'

class DayCalendar extends Component {
  state = {
    offset: 0,
  }

  goToPreviousDay= () => this.setState(state => ({ offset: state.offset - 1 }))

  gotToNextDay = () => this.setState(state => ({ offset: state.offset + 1 }))

  goToToday = () => this.setState({ offset: 0 })

  render() {
    const {
      date,
      start,
      end,
      sessions,
    } = this.props

    const parsedDate = addDays(date, this.state.offset)

    const hours = Array(24)
      .fill('')
      .map((_, index) => index)
      .filter(hour => hour >= start && hour <= end)
      // eslint-disable-next-line no-confusing-arrow
      .map(hour => hour < 10 ? `0${hour}` : hour)
    const daySessions = sessions
      .filter(({ date: sessionDate }) => isSameDay(sessionDate, parsedDate))
    const rooms = uniq(daySessions.flatMap(session => session.room))
    const columns = ['', ...rooms]

    return (
      <div className="cc-day-calendar">
        <div className="cc-day-calendar-header">
          <span className="cc-day-day">{format(parsedDate, 'DD MMMM YYYY')}</span>
          <div className="cc-day-buttons">
            <Button
              secondary
              onClick={this.goToPreviousDay}
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
              onClick={this.gotToNextDay}
            >
              Next
            </Button>
          </div>
        </div>
        <div className="cc-day-rooms">
          {columns.map(room => (
            <div key={room} className="cc-day-room">{room}</div>
          ))}
        </div>
        <div className="cc-day-columns">
          {columns.map(room => (
            <div className="cc-day-column">
              {hours.map(hour => (
                <div key={hour} className="cc-day-hour">
                  {room === '' && (
                    <div className="cc-day-hour-header">
                      {hour}
                      <span className="cc-day-hour-header-minutes">00</span>
                    </div>
                  )}
                </div>
              ))}
              {daySessions
                .filter(({ room: sessionRoom }) => room === sessionRoom)
                .map(({
                  title,
                  duration,
                  date: sessionDate,
                  speakers,
                }) => {
                  const borderWidth = 1
                  return (
                    <div
                      key={title}
                      style={{
                        top: `${(sessionDate.getHours() - start) * 125 + borderWidth}px`,
                        height: `${125 * (duration / 60) - borderWidth}px`,
                      }}
                      className="cc-day-session"
                    >
                      {title}<br />
                      <i className="cc-day-session-speakers">{speakers.join(', ')}</i>
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

DayCalendar.propTypes = {
  date: PropTypes.instanceOf(Date),
  start: PropTypes.number,
  end: PropTypes.number,
  sessions: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    duration: PropTypes.number,
    room: PropTypes.string,
  })),
}

DayCalendar.defaultProps = {
  date: new Date(),
  start: 7,
  end: 19,
  sessions: [],
}

export default DayCalendar
