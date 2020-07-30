import React from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'

import { useAuth } from 'features/auth'
import { Drawer } from 'components/portals'
import Button from 'components/button'
import IconLabel from 'components/iconLabel'
import Thread from 'components/thread'

import useReviewerThreads from './useReviewerThreads'
import styles from './reviewersThread.module.css'

const ReviewersThread = ({ eventId, proposalId }) => {
  const { user } = useAuth()

  const { messages, saveMessage, deleteMessage } = useReviewerThreads({
    eventId,
    proposalId,
    user,
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
      <Thread
        className={styles.reviewersThread}
        description="Discuss with other reviewers about this proposal. The speaker WILL NOT see these comments."
        currentUser={user.uid}
        messages={messages}
        onSaveMessage={saveMessage}
        onDeleteMessage={deleteMessage}
      />
    </Drawer>
  )
}

ReviewersThread.propTypes = {
  eventId: PropTypes.string.isRequired,
  proposalId: PropTypes.string.isRequired,
}

export default ReviewersThread
