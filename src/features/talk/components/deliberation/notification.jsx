import React from 'react'
import PropTypes from 'prop-types'

import Button from 'components/button'
import Alert from 'components/alert'
import { useUpdateSubmissionState } from 'features/submission/useSubmissions'
import { useEvent } from 'features/event/useEvents'

const Notification = ({ talkId, eventId, className }) => {
  const { data: event, isLoading } = useEvent(eventId)

  const title = `This talk has been accepted at ${event.name}.`
  const onConfirm = useUpdateSubmissionState(talkId, eventId, 'confirmed')
  const onDecline = useUpdateSubmissionState(talkId, eventId, 'declined')

  if (isLoading) return null

  return (
    <Alert
      type="info"
      className={className}
      title={title}
      actionButtons={
        <>
          <Button onClick={onConfirm} primary>
            I confirm my presence
          </Button>
          <Button onClick={onDecline} primary error>
            I cancel my presence
          </Button>
        </>
      }
    />
  )
}

Notification.propTypes = {
  talkId: PropTypes.string.isRequired,
  eventId: PropTypes.string.isRequired,
  className: PropTypes.string,
}

Notification.defaultProps = {
  className: undefined,
}

export default Notification
