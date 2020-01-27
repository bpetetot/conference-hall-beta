import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@k-redux-router/react-k-ramel'

import Titlebar from 'components/titlebar'
import IconLabel from 'components/iconLabel'
import Button from 'components/button'
import { List, ListItem } from 'components/list'

const MeetupsList = ({ eventId, meetups, onSelect }) => {
  return (
    <div>
      <Titlebar icon="fa fa-calendar" title="My Meetups">
        <Button>
          {btn => (
            <Link code="organizer-meetups-create" eventId={eventId} className={btn}>
              <IconLabel icon="fa fa-calendar-plus-o" label="Create meetup" />
            </Link>
          )}
        </Button>
      </Titlebar>
      <List
        array={meetups}
        noResult="No meetups yet !"
        renderRow={({ id, name }) => (
          <ListItem key={id} title={name} onSelect={() => onSelect(id)} />
        )}
      />
    </div>
  )
}

MeetupsList.propTypes = {
  eventId: PropTypes.string.isRequired,
  meetups: PropTypes.arrayOf(PropTypes.object),
  onSelect: PropTypes.func.isRequired,
}

MeetupsList.defaultProps = {
  meetups: [],
}

export default MeetupsList
