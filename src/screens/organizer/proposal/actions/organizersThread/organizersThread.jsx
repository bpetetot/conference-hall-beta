import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Drawer } from 'components/portals'
import Button from 'components/button'
import IconLabel from 'components/iconLabel'
import Thread from 'components/thread'

import styles from './organizersThread.module.css'

class OrganizersThread extends Component {
  componentDidMount() {
    this.props.loadMessages()
  }

  componentDidUpdate(prevProps) {
    const { proposalId, loadMessages } = this.props
    if (proposalId !== prevProps.proposalId) {
      loadMessages()
    }
  }

  render() {
    const { messages, onAddMessage } = this.props
    return (
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
  }
}

OrganizersThread.propTypes = {
  proposalId: PropTypes.string.isRequired,
  messages: Thread.propTypes.messages,
  onAddMessage: PropTypes.func.isRequired,
  loadMessages: PropTypes.func.isRequired,
}

OrganizersThread.defaultProps = {
  messages: [],
}

export default OrganizersThread
