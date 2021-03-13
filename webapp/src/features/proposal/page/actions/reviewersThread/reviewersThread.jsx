/* eslint-disable react/prop-types */
import React from 'react'
import isEmpty from 'lodash/isEmpty'

import { Drawer } from 'components/portals'
import Button from 'components/button'
import IconLabel from 'components/iconLabel'
import Thread from 'components/thread'
import LoadingIndicator from 'components/loader'
import { useDeleteReviewerMessage, useReviewerMessages, useSaveReviewerMessage } from 'data/message'
import { useNotification } from 'app/layout/notification/context'

import styles from './reviewersThread.module.css'

const ReviewersThreadDrawer = ({ eventId, proposalId }) => {
  const { sendError } = useNotification()
  const { data: messages, isLoading, isSuccess, isError, error } = useReviewerMessages(
    eventId,
    proposalId,
  )
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

  const nbMessages = !isEmpty(messages) ? ` (${messages.length})` : ''
  return (
    <Drawer
      title="Reviewers thread"
      renderTrigger={({ show }) => (
        <Button secondary onClick={show}>
          <IconLabel icon="fa fa-comments" label={`Reviewers thread${nbMessages}`} />
        </Button>
      )}
    >
      {isLoading && <LoadingIndicator />}
      {isError && <div>An unexpected error has occurred: {error.message}</div>}
      {isSuccess && (
        <Thread
          className={styles.reviewersThread}
          description="Discuss with other reviewers about this proposal. The speaker WILL NOT see these comments."
          messages={messages}
          onSaveMessage={onSave}
          onDeleteMessage={onDelete}
        />
      )}
    </Drawer>
  )
}

export default ReviewersThreadDrawer
