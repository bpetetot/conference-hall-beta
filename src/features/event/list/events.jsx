import React, { useState, useMemo, useCallback } from 'react'
import get from 'lodash/get'
import { Link, useNavigate } from 'react-router-dom'

import { LoadingIndicator } from 'components/loader'
import Badge from 'components/badge'
import Titlebar from 'components/titlebar'
import IconLabel from 'components/iconLabel'
import Button from 'components/button'
import { List, ListItem } from 'components/list'
import EventDates from 'features/event/page/eventDates'

import styles from './events.module.css'
import { useOrganizerEvents } from '../useEvents'

const MyEvents = () => {
  const { data: events, isLoading, isFetched } = useOrganizerEvents()

  const [status, setStatus] = useState('active')
  const filteredEvents = useMemo(
    () =>
      events?.filter((event) => {
        if (status === 'all') return true
        if (status === 'archived') return event.archived === true
        return event.archived !== true
      }),
    [status, events],
  )
  const onFilter = (e) => setStatus(e.target.value)

  const navigate = useNavigate()
  const handleSelect = useCallback((eventId) => navigate(`/organizer/event/${eventId}/proposals`), [
    navigate,
  ])

  if (isLoading || !isFetched) return <LoadingIndicator />

  return (
    <div>
      <Titlebar icon="fa fa-calendar-o" title="My events">
        <select onChange={onFilter} value={status}>
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
      <List
        array={filteredEvents}
        noResult={status === 'archived' ? 'No archived event' : 'No event yet !'}
        renderRow={({ id, name, type, visibility, address, conferenceDates }) => (
          <ListItem
            key={id}
            title={<div className={styles.title}>{name}</div>}
            subtitle={
              <IconLabel icon="fa fa-map-marker" label={get(address, 'formattedAddress')} />
            }
            info={
              <div className={styles.infos}>
                <div className={styles.badges}>
                  {visibility === 'private' && (
                    <Badge pill outline error={visibility === 'private'}>
                      {visibility}
                    </Badge>
                  )}
                  <Badge
                    pill
                    outline
                    success={type === 'meetup'}
                    info={type === 'conference'}
                    className={styles.type}
                  >
                    {type}
                  </Badge>
                </div>
                {type === 'conference' && (
                  <EventDates
                    dates={conferenceDates}
                    className={styles.dates}
                    timezone={get(address, 'timezone.id')}
                  />
                )}
              </div>
            }
            onSelect={() => handleSelect(id)}
          />
        )}
      />
    </div>
  )
}

export default MyEvents
