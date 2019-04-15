import React from 'react'
import PropTypes from 'prop-types'

import Titlebar from 'components/titlebar'
import MonthCalendar from 'components/calendar/monthCalendar'
import DayCalendar from 'components/calendar/dayCalendar'

const Agenda = ({ isMeetup }) => (
  <div>
    <Titlebar icon="fa fa-calendar" title="Agenda" className="no-print" />
    {isMeetup ? (
      <MonthCalendar />
    ) : (
      <DayCalendar sessions={[]} />
    )}
  </div>
)

Agenda.propTypes = {
  isMeetup: PropTypes.bool.isRequired,
}

export default Agenda
