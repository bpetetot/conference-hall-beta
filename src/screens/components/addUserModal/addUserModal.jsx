import React from 'react'
import PropTypes from 'prop-types'

import { Modal } from 'components/portals'
import InputButton from 'components/form/inputButton'
import { LoadingIndicator } from 'components/loader'
import UserResults from './userResults'

import InviteLink from './inviteLink'
import styles from './addUserModal.module.css'

const AddUserModal = ({
  title,
  description,
  searching,
  initialized,
  email,
  users,
  resultsMessage,
  onSearch,
  onSelectUser,
  renderTrigger,
  inviteEntity,
  inviteEntityId,
}) => (
  <Modal renderTrigger={renderTrigger}>
    {({ hide }) => (
      <>
        <h1 className={styles.title}>{title}</h1>
        {description}
        {searching ? (
          <LoadingIndicator />
        ) : (
          <InputButton
            type="search"
            placeholder="Search a user by email"
            btnLabel="Search"
            btntitle="Search"
            autoFocus
            defaultValue={email}
            onClick={onSearch}
          />
        )}
        {initialized && !searching && (
          <UserResults
            message={resultsMessage}
            users={users}
            onSelectUser={uid => {
              onSelectUser(uid)
              hide()
            }}
          />
        )}

        {inviteEntity && inviteEntityId && (
          <div className={styles.inviteLink}>
            <div className={styles.separator}>
              <small>If you can&apos;t find the user, send him/her an invitation link</small>
            </div>
            <InviteLink entity={inviteEntity} entityId={inviteEntityId} />
          </div>
        )}
      </>
    )}
  </Modal>
)

AddUserModal.propTypes = {
  title: PropTypes.string,
  description: PropTypes.node.isRequired,
  searching: PropTypes.bool,
  initialized: PropTypes.bool,
  email: PropTypes.string,
  users: PropTypes.arrayOf(PropTypes.string),
  resultsMessage: PropTypes.node.isRequired,
  onSearch: PropTypes.func.isRequired,
  onSelectUser: PropTypes.func.isRequired,
  renderTrigger: PropTypes.func,
  inviteEntity: PropTypes.string,
  inviteEntityId: PropTypes.string,
}

AddUserModal.defaultProps = {
  title: 'Add a member',
  email: undefined,
  searching: false,
  initialized: false,
  users: [],
  renderTrigger: undefined,
  inviteEntity: undefined,
  inviteEntityId: undefined,
}

export default AddUserModal
