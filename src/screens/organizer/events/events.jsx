import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'redux-little-router'

import Badge from 'components/badge'
import Titlebar from 'components/titlebar'
import IconLabel from 'components/iconLabel'
import Button from 'components/button'
import { List, ListItem } from 'components/list'
import EventDates from 'screens/components/eventDates'

import styles from './events.module.css'

const MyEvents = ({ events, onSelect }) => (
  <div>
    <Titlebar icon="fa fa-calendar-o" title="My events">
      <Button>
        {btn => (
          <Link href="/organizer/event/create" className={btn}>
            <IconLabel icon="fa fa-calendar-plus-o" label="Create event" />
          </Link>
        )}
      </Button>
    </Titlebar>
    <List
      array={events}
      noResult="No event yet !"
      renderRow={({
        id, name, type, address, conferenceDates,
      }) => (
        <ListItem
          key={id}
          title={<div className={styles.title}>{name}</div>}
          subtitle={
            <IconLabel icon="fa fa-map-marker" label={address} />
          }
          info={(
            <div className={styles.infos}>
              <Badge
                pill
                outline
                info={type === 'meetup'}
                warning={type === 'conference'}
                className={styles.type}
              >
                {type}
              </Badge>
              {type === 'conference' && (
                <EventDates dates={conferenceDates} className={styles.dates} />
              )}
            </div>
          )}
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
