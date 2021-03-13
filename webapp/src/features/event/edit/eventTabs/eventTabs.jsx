import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { Link, useMatch } from 'react-router-dom'

import IconLabel from 'components/iconLabel'
import './eventTabs.css'

const TabLink = ({ to, children }) => {
  const match = useMatch({ path: to, end: true })
  return (
    <Link to={to} className={cn({ 'tab-active': match })}>
      {children}
    </Link>
  )
}

TabLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

const EventTabs = ({ eventId }) => (
  <ul className="event-tabs tabs card">
    <li>
      <TabLink to={`/organizer/event/${eventId}/edit`}>
        <IconLabel icon="fa fa-calendar-check-o" label="Event" />
      </TabLink>
    </li>
    <li>
      <TabLink to={`/organizer/event/${eventId}/edit/cfp`}>
        <IconLabel icon="fa fa-gear" label="CFP Settings" />
      </TabLink>
    </li>
    <li>
      <TabLink to={`/organizer/event/${eventId}/edit/custom`}>
        <IconLabel icon="fa fa-paint-brush" label="Customize" />
      </TabLink>
    </li>
    <li>
      <TabLink to={`/organizer/event/${eventId}/edit/deliberation`}>
        <IconLabel icon="fa fa-check-square-o" label="Deliberation" />
      </TabLink>
    </li>
    <li>
      <TabLink to={`/organizer/event/${eventId}/edit/survey`}>
        <IconLabel icon="fa fa-question-circle" label="Speaker survey" />
      </TabLink>
    </li>
    <li>
      <TabLink to={`/organizer/event/${eventId}/edit/integrations`}>
        <IconLabel icon="fa fa-rocket" label="Integrations" />
      </TabLink>
    </li>
  </ul>
)

EventTabs.propTypes = {
  eventId: PropTypes.number.isRequired,
}

export default EventTabs
