import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'redux-little-router'
import Titlebar from 'components/titlebar'
import IconLabel from 'components/iconLabel'
import { List, ListItem } from 'components/list'
import RelativeDate from 'components/relativeDate'
import './events.css'

const MyEvents = ({ events, onSelect }) => (
  <div className="events-page">
    <Titlebar className="events-header" icon="fa fa-calendar-o" title="My events">
      <Link href="/organizer/event/create" className="btn">
        <IconLabel icon="fa fa-calendar-plus-o" label="Create event" />
      </Link>
    </Titlebar>
    <List
      className="events-content"
      array={events}
      noResult="No event yet !"
      renderRow={({ id, name, updateTimestamp }) => (
        <ListItem
          key={id}
          title={name}
          subtitle={<RelativeDate date={updateTimestamp} />}
          onSelect={() => onSelect(id)}
        />
      )}
    />
  </div>
)

MyEvents.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object),
  onSelect: PropTypes.func.isRequired,
}

MyEvents.defaultProps = {
  events: [],
}

export default MyEvents
