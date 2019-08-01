import React from 'react'
import PropTypes from 'prop-types'
import isSameDay from 'date-fns/is_same_day'

import Titlebar from 'components/titlebar'
import MonthCalendar from 'components/calendar/monthCalendar'
import DayCalendar from 'components/calendar/dayCalendar'

import Form from '../meetup/form/meetupCreate.container'

const Agenda = ({ isMeetup, meetups }) => (
  <div>
    <Titlebar icon="fa fa-calendar" title="Agenda" className="no-print" />
    {isMeetup ? (
      <MonthCalendar
        date={Date.now()}
        renderDay={date => meetups
          .filter(meetup => isSameDay(meetup.date.toDate(), date))
          .map(meetup => meetup.name)
        }
        addEventTitle="Create a meetup"
        renderAddEvent={date => (
          <Form date={date} />
        )}
      />
    ) : (
      <DayCalendar sessions={[]} />
    )}
  </div>
)

Agenda.propTypes = {
  isMeetup: PropTypes.bool.isRequired,
  meetups: PropTypes.array,
}

export default Agenda
