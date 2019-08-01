import React from 'react'
import PropTypes from 'prop-types'
import isSameDay from 'date-fns/is_same_day'

import Titlebar from 'components/titlebar'
import MonthCalendar from 'components/calendar/monthCalendar'
import DayCalendar from 'components/calendar/dayCalendar'

import CreateForm from '../meetup/form/meetupCreate.container'
import EditForm from '../meetup/form/meetupEdit.container'

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
          <CreateForm date={date} />
        )}
        renderUpdateEvent={(date, index) => {
          const { id } = meetups
            .filter(meetup => isSameDay(meetup.date.toDate(), date))[index]

          return (
            <EditForm id={id} />
          )
        }}
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

Agenda.defaultProps = {
  meetups: [],
}

export default Agenda
