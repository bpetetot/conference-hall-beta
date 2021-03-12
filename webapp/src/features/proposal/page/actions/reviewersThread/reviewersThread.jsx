/* eslint-disable react/prop-types */
import React from 'react'
import isEmpty from 'lodash/isEmpty'

import { Drawer } from 'components/portals'
import Button from 'components/button'
import IconLabel from 'components/iconLabel'
import Thread from 'components/thread'
import LoadingIndicator from 'components/loader'
import { useDeleteReviewerMessage, useReviewerMessages, useSaveReviewerMessage } from 'data/message'

import styles from './reviewersThread.module.css'

const ReviewersThreadDrawer = ({ eventId, proposalId }) => {
  const { data: messages, isLoading } = useReviewerMessages(eventId, proposalId)
  const { mutate: saveMessage } = useSaveReviewerMessage(eventId, proposalId)
  const { mutate: deleteMessage } = useDeleteReviewerMessage(eventId, proposalId)
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
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <Thread
          className={styles.reviewersThread}
          description="Discuss with other reviewers about this proposal. The speaker WILL NOT see these comments."
          messages={messages}
          onSaveMessage={saveMessage}
          onDeleteMessage={deleteMessage}
        />
      )}
    </Drawer>
  )
}

export default ReviewersThreadDrawer
