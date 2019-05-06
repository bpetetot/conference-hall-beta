import React from 'react'
import PropTypes from 'prop-types'

import Titlebar from 'components/titlebar'
import MonthCalendar from 'components/calendar/monthCalendar'
import DayCalendar from 'components/calendar/dayCalendar'

const Agenda = ({ isMeetup, createMeetup }) => (
  <div>
    <Titlebar icon="fa fa-calendar" title="Agenda" className="no-print" />
    {isMeetup ? (
      <MonthCalendar
        date={Date.now()}
        onDayClick={date => createMeetup(date)}
      />
    ) : (
      <DayCalendar sessions={[]} />
    )}
  </div>
)

Agenda.propTypes = {
  isMeetup: PropTypes.bool.isRequired,
  createMeetup: PropTypes.func.isRequired,
}

export default Agenda
