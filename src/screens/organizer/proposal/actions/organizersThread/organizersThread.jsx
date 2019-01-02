import React from 'react'
import PropTypes from 'prop-types'

import { Drawer } from 'components/portals'
import Button from 'components/button'
import IconLabel from 'components/iconLabel'
import Thread from 'components/thread'

import styles from './organizersThread.module.css'

const OrganizersThread = ({ messages, onAddMessage }) => (
  <Drawer
    title="Organizers thread"
    renderTrigger={({ show }) => (
      <Button secondary onClick={show}>
        <IconLabel icon="fa fa-comments" label={`Organizers thread (${messages.length})`} />
      </Button>
    )}
  >
    <Thread
      className={styles.organizersThread}
      description="Discuss with other organizers about this proposal. The speaker WILL NOT see these comments."
      messages={messages}
      onAddMessage={onAddMessage}
    />
  </Drawer>
)

OrganizersThread.propTypes = {
  messages: Thread.propTypes.messages,
  onAddMessage: PropTypes.func.isRequired,
}

OrganizersThread.defaultProps = {
  messages: [],
}

export default OrganizersThread
