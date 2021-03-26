import React from 'react'
import PropTypes from 'prop-types'

import Button from 'components/button'
import Alert from 'components/alert'
import { useEvent } from 'data/event'
import { useConfirmTalk } from 'data/talk'
import { useNotification } from 'app/layout/notification/context'

const Notification = ({ proposal }) => {
  const { sendError } = useNotification()
  const { data: event } = useEvent(proposal.eventId)
  const { mutate: confirmTalk, isLoading } = useConfirmTalk(event?.id, proposal.talkId)

  if (!event) return null
  const title = `This talk has been accepted at ${event.name}.`

  const onConfirm = () =>
    confirmTalk(true, {
      onError: (err) => sendError(`An unexpected error has occurred: ${err.message}`),
    })

  const onDecline = () =>
    confirmTalk(false, {
      onError: (err) => sendError(`An unexpected error has occurred: ${err.message}`),
    })

  return (
    <Alert
      type="info"
      title={title}
      actionButtons={
        <>
          <Button onClick={onConfirm} primary loading={isLoading} disabled={isLoading}>
            I confirm my presence
          </Button>
          <Button onClick={onDecline} primary error loading={isLoading} disabled={isLoading}>
            I cancel my presence
          </Button>
        </>
      }
    />
  )
}

Notification.propTypes = {
  proposal: PropTypes.object.isRequired,
}

export default Notification
