import React from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'

import { Drawer } from 'components/portals'
import Button from 'components/button'
import IconLabel from 'components/iconLabel'
import Thread from 'components/thread'

import useOrganizerThreads from './useOrganizerThreads'
import styles from './organizersThread.module.css'

const OrganizersThread = ({ eventId, proposalId, user }) => {
  const { messages, saveMessage, deleteMessage } = useOrganizerThreads({
    eventId,
    proposalId,
    user,
  })

  const nbMessages = !isEmpty(messages) ? ` (${messages.length})` : ''
  return (
    <Drawer
      title="Organizers thread"
      renderTrigger={({ show }) => (
        <Button secondary onClick={show}>
          <IconLabel icon="fa fa-comments" label={`Organizers thread${nbMessages}`} />
        </Button>
      )}
    >
      <Thread
        className={styles.organizersThread}
        description="Discuss with other organizers about this proposal. The speaker WILL NOT see these comments."
        currentUser={user.uid}
        messages={messages}
        onSaveMessage={saveMessage}
        onDeleteMessage={deleteMessage}
      />
    </Drawer>
  )
}

OrganizersThread.propTypes = {
  eventId: PropTypes.string.isRequired,
  proposalId: PropTypes.string.isRequired,
  user: PropTypes.object,
}

OrganizersThread.defaultProps = {
  user: {},
}

export default OrganizersThread
