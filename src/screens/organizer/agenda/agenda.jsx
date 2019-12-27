import React, { useState } from 'react'
import PropTypes from 'prop-types'
import isSameDay from 'date-fns/isSameDay'

import Titlebar from 'components/titlebar'
import MonthCalendar from 'components/calendar/monthCalendar'
import DayCalendar from 'components/calendar/dayCalendar'

import CreateMeetupModal from './createMeetup'
import EditMeetupModal from './editMeetup'

const Agenda = ({ isMeetup, meetups }) => {
  const [createMeetup, setCreateMeetup] = useState({ date: null })
  const [editMeetup, setEditMeetup] = useState({ id: null })

  const onRenderDay = date =>
    meetups.filter(meetup => isSameDay(meetup.date.toDate(), date)).map(meetup => meetup.name)

  return (
    <div>
      <Titlebar icon="fa fa-calendar" title="Agenda" className="no-print" />
      {isMeetup ? (
        <CreateMeetupModal {...createMeetup}>
          {({ show: openCreateMeetup }) => (
            <EditMeetupModal {...editMeetup}>
              {({ show: openEditMeetup }) => (
                <MonthCalendar
                  renderDay={onRenderDay}
                  onClickDay={date => {
                    setCreateMeetup({ date })
                    openCreateMeetup()
                  }}
                  onClickItem={(date, index) => {
                    const { id } = meetups.filter(meetup => isSameDay(meetup.date.toDate(), date))[
                      index
                    ]
                    setEditMeetup({ id })
                    openEditMeetup()
                  }}
                />
              )}
            </EditMeetupModal>
          )}
        </CreateMeetupModal>
      ) : (
        <DayCalendar sessions={[]} />
      )}
    </div>
  )
}

Agenda.propTypes = {
  isMeetup: PropTypes.bool.isRequired,
  meetups: PropTypes.array,
}

Agenda.defaultProps = {
  meetups: [],
}

export default Agenda
