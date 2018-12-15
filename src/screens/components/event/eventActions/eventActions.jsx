import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@k-redux-router/react-k-ramel'
import cn from 'classnames'

import Button from 'components/button'
import IconLabel from 'components/iconLabel'
import CopyInput from 'components/copyInput'
import SubmitTalkLink from '../../submitTalksLink'

import './eventActions.css'

const EventActions = ({ eventId, isOrganizer, className }) => {
  const { origin } = window.location
  return (
    <div className={cn('event-actions', className)}>
      {isOrganizer && (
        <Button primary>
          {btn => (
            <Link code="EDIT_EVENT" eventId={eventId} className={btn}>
              <IconLabel icon="fa fa-pencil" label="Edit" />
            </Link>
          )}
        </Button>
      )}
      <SubmitTalkLink eventId={eventId} />
      {isOrganizer && <CopyInput title="Share link" value={`${origin}/public/event/${eventId}`} />}
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
