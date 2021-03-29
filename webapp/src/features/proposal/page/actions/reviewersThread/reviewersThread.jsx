import React from 'react'
import PropTypes from 'prop-types'

import { Drawer } from 'components/portals'
import Button from 'components/button'
import IconLabel from 'components/iconLabel'
import Thread from 'components/thread'
import LoadingIndicator from 'components/loader'
import { useDeleteReviewerMessage, useReviewerMessages, useSaveReviewerMessage } from 'data/message'
import { useNotification } from 'app/layout/notification/context'

import styles from './reviewersThread.module.css'

const ReviewersThread = ({ eventId, proposalId }) => {
  const { sendError } = useNotification()
  const { data: messages, isLoading, isError, error } = useReviewerMessages(eventId, proposalId)
  const { mutateAsync: saveMessage } = useSaveReviewerMessage(eventId, proposalId)
  const { mutateAsync: deleteMessage } = useDeleteReviewerMessage(eventId, proposalId)

  const onSave = (args) =>
    saveMessage(args).catch((err) => {
      sendError(`An unexpected error has occurred: ${err.message}`)
    })
  const onDelete = (args) =>
    deleteMessage(args).catch((err) => {
      sendError(`An unexpected error has occurred: ${err.message}`)
    })

  if (isLoading) return <LoadingIndicator />

  if (isError) return <div>An unexpected error has occurred: {error.message}</div>

  return (
    <Thread
      className={styles.reviewersThread}
      description="Discuss with other reviewers about this proposal. The speaker WILL NOT see these comments."
      messages={messages}
      onSaveMessage={onSave}
      onDeleteMessage={onDelete}
    />
  )
}

ReviewersThread.propTypes = {
  eventId: PropTypes.number.isRequired,
  proposalId: PropTypes.number.isRequired,
}

const ReviewersThreadDrawer = ({ eventId, proposal }) => {
  const nbMessages = proposal.messageCount > 0 ? ` (${proposal.messageCount})` : ''
  return (
    <Drawer
      title="Reviewers thread"
      renderTrigger={({ show }) => (
        <Button secondary onClick={show}>
          <IconLabel icon="fa fa-comments" label={`Reviewers thread${nbMessages}`} />
        </Button>
      )}
    >
      <ReviewersThread eventId={eventId} proposalId={proposal.id} />
    </Drawer>
  )
}

ReviewersThreadDrawer.propTypes = {
  eventId: PropTypes.number.isRequired,
  proposal: PropTypes.object.isRequired,
}

export default ReviewersThreadDrawer
