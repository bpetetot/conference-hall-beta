import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'redux-little-router'
import cn from 'classnames'

import IconLabel from 'components/iconLabel'
import CopyInput from 'components/copyInput'
import SubmitTalkLink from '../../submitTalksLink'

import './eventActions.css'

const EventActions = ({ eventId, isOrganizer, className }) => {
  const url = window.location.href.split('/')
  return (
    <div className={cn('event-actions', className)}>
      {isOrganizer && (
        <Link href={`/organizer/event/${eventId}/edit`} className="btn">
          <IconLabel icon="fa fa-pencil" label="Edit" />
        </Link>
      )}
      <SubmitTalkLink className="btn" eventId={eventId} />
      {isOrganizer && (
        <CopyInput title="Share link" value={`${url[0]}//${url[2]}/public/event/${eventId}`} />
      )}
    </div>
  )
}

EventActions.propTypes = {
  isOrganizer: PropTypes.bool.isRequired,
  eventId: PropTypes.string.isRequired,
  className: PropTypes.string,
}

EventActions.defaultProps = {
  className: undefined,
}

export default EventActions
