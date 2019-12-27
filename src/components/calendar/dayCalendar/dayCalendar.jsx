import React, { useState } from 'react'
import { PropTypes } from 'prop-types'
import uniq from 'lodash/uniq'
import format from 'date-fns/format'
import isSameDay from 'date-fns/isSameDay'

import Navigator from '../navigator'
import './dayCalendar.css'

const DayCalendar = ({ date, start, end, sessions }) => {
  const [currentDate, setCurrentDate] = useState(date)

  const hours = Array(24)
    .fill('')
    .map((_, index) => index)
    .filter(hour => hour >= start && hour <= end)
    .map(hour => (hour < 10 ? `0${hour}` : hour))

  const daySessions = sessions.filter(({ date: sessionDate }) =>
    isSameDay(sessionDate, currentDate),
  )
  const rooms = uniq(daySessions.flatMap(session => session.room))
  const columns = rooms.length === 0 ? ['', format(currentDate, 'dd MMMM yyyy')] : ['', ...rooms]

  return (
    <div className="cc-day-calendar">
      <Navigator type="day" date={currentDate} onChangeDate={setCurrentDate} />
      <div className="cc-day-content">
        <div className="cc-day-rooms">
          {columns.map(room => (
            <div key={room} className="cc-day-room">
              {room}
            </div>
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
                .map(({ title, duration, date: sessionDate, speakers }) => {
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
                      {title}
                      <br />
                      <i className="cc-day-session-speakers">{speakers.join(', ')}</i>
                    </div>
                  )
                })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

DayCalendar.propTypes = {
  date: PropTypes.instanceOf(Date),
  start: PropTypes.number,
  end: PropTypes.number,
  sessions: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      date: PropTypes.instanceOf(Date),
      duration: PropTypes.number,
      room: PropTypes.string,
    }),
  ),
}

DayCalendar.defaultProps = {
  date: new Date(),
  start: 7,
  end: 19,
  sessions: [],
}

export default DayCalendar
