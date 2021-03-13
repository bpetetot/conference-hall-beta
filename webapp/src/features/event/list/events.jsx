import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Badge from 'components/badge'
import Titlebar from 'components/titlebar'
import IconLabel from 'components/iconLabel'
import Button from 'components/button'
import { List, ListItem } from 'components/list'
import LoadingIndicator from 'components/loader'
import EventDates from 'features/event/page/eventDates'

import { useOrganizerEvents } from '../../../data/event'
import styles from './events.module.css'

const MyEvents = () => {
  const navigate = useNavigate()
  const [status, setStatus] = useState('active')
  const { data: events, isLoading, isSuccess, isError, error } = useOrganizerEvents(status)

  const onFilter = (e) => setStatus(e.target.value)

  const handleSelect = (eventId) => navigate(`/organizer/event/${eventId}`)

  return (
    <div>
      <Titlebar icon="fa fa-calendar-o" title="My events">
        <select onChange={onFilter} value={status} aria-label="Events filter">
          <option value="all">All events</option>
          <option value="archived">Archived events</option>
          <option value="active">Active events</option>
        </select>
        <Button>
          {(btn) => (
            <Link to="/organizer/event/create" className={btn}>
              <IconLabel icon="fa fa-calendar-plus-o" label="Create event" />
            </Link>
          )}
        </Button>
      </Titlebar>

      {isLoading && <LoadingIndicator />}
      {isError && <div>An unexpected error has occurred: {error.message}</div>}

      {isSuccess && (
        <List
          array={events}
          noResult={status === 'archived' ? 'No archived event' : 'No event yet !'}
          renderRow={({ id, name, type, visibility, address, timezone, conferenceDates }) => (
            <ListItem
              key={id}
              title={<div className={styles.title}>{name}</div>}
              subtitle={<IconLabel icon="fa fa-map-marker" label={address} />}
              info={
                <div className={styles.infos}>
                  <div className={styles.badges}>
                    {visibility === 'PRIVATE' && (
                      <Badge pill outline error={visibility === 'PRIVATE'}>
                        {visibility}
                      </Badge>
                    )}
                    <Badge pill outline className={styles.type}>
                      {type}
                    </Badge>
                  </div>
                  {type === 'CONFERENCE' && (
                    <EventDates
                      dates={conferenceDates}
                      className={styles.dates}
                      timezone={timezone}
                    />
                  )}
                </div>
              }
              onSelect={() => handleSelect(id)}
            />
          )}
        />
      )}
    </div>
  )
}

export default MyEvents
