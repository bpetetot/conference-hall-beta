import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from '@k-redux-router/react-k-ramel'

import { fetchEventMeetups } from 'firebase/meetups'
import Titlebar from 'components/titlebar'
import IconLabel from 'components/iconLabel'
import Button from 'components/button'
import { List, ListItem } from 'components/list'
import { LoadingIndicator } from 'components/loader'

const MeetupsList = ({ eventId, push }) => {
  const [meetups, setMeetups] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEventMeetups(eventId)
      .then(setMeetups)
      .then(() => setLoading(false))
  }, [eventId])

  const goToEditMeetup = meetupId => {
    push('organizer-meetups-edit', { eventId, meetupId })
  }

  return (
    <>
      <Titlebar icon="fa fa-calendar" title="My Meetups">
        <Button>
          {btn => (
            <Link code="organizer-meetups-create" eventId={eventId} className={btn}>
              <IconLabel icon="fa fa-calendar-plus-o" label="Create meetup" />
            </Link>
          )}
        </Button>
      </Titlebar>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <List
          array={meetups}
          noResult="No meetups yet !"
          renderRow={({ id, name }) => (
            <ListItem key={id} title={name} onSelect={() => goToEditMeetup(id)} />
          )}
        />
      )}
    </>
  )
}

MeetupsList.propTypes = {
  eventId: PropTypes.string.isRequired,
  push: PropTypes.func.isRequired,
}

export default MeetupsList
