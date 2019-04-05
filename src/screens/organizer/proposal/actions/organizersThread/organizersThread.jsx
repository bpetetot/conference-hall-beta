import React, { Component } from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'

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
    const {
      messages,
      onSaveMessage,
      onEditMessage,
      currentUser,
    } = this.props
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
          currentUser={currentUser}
          messages={messages}
          onSaveMessage={onSaveMessage}
          onEditMessage={onEditMessage}
        />
      </Drawer>
    )
  }
}

OrganizersThread.propTypes = {
  proposalId: PropTypes.string.isRequired,
  messages: Thread.propTypes.messages,
  currentUser: PropTypes.string.isRequired,
  onSaveMessage: PropTypes.func.isRequired,
  onEditMessage: PropTypes.func.isRequired,
  loadMessages: PropTypes.func.isRequired,
}

OrganizersThread.defaultProps = {
  messages: [],
}

export default OrganizersThread
