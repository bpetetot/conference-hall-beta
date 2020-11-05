import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import { useNavigate } from 'react-router-dom'

import { LoadingIndicator } from 'components/loader'
import { List, ListItem } from 'components/list'
import Badge from 'components/badge'
import IconLabel from 'components/iconLabel'
import NoEvents from 'features/event/noEvents'
import EventDates from 'features/event/page/eventDates'
import TalkStatus from 'features/talk/components/status'
import { usePublicEvents } from 'features/event/useEvents'

import styles from './eventsSelection.module.css'

const EventsSelection = ({ talkId, onSelect }) => {
  const { data: events, isLoading } = usePublicEvents()

  const navigate = useNavigate()
  const handleSelect = useCallback(
    (eventId) => {
      onSelect()
      navigate(`/speaker/event/${eventId}/submission`)
    },
    [onSelect, navigate],
  )

  if (isLoading) return <LoadingIndicator />

  return (
    <List
      array={events}
      noResult={<NoEvents />}
      renderRow={({ id, name, type, address, conferenceDates }) => (
        <ListItem
          key={id}
          title={
            <div className={styles.title}>
              <span>{name}</span>
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
          }
          subtitle={
            <>
              {type === 'conference' && (
                <EventDates
                  dates={conferenceDates}
                  className={styles.dates}
                  timezone={get(address, 'timezone.id')}
                />
              )}
              <IconLabel icon="fa fa-map-marker" label={address && address.formattedAddress} />
            </>
          }
          info={<TalkStatus talkId={talkId} eventId={id} />}
          onSelect={() => handleSelect(id)}
        />
      )}
    />
  )
}

EventsSelection.propTypes = {
  talkId: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
}

export default EventsSelection
