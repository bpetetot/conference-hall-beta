import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Modal } from 'components/portals'
import InputButton from 'components/form/inputButton'
import { LoadingIndicator } from 'components/loader'
import UserResults from './userResults'
import InviteLink from './inviteLink'
import styles from './addUserModal.module.css'
import { useUsersByEmail } from '../useUser'

const AddUserModal = ({ renderTrigger, ...rest }) => {
  return (
    <Modal renderTrigger={renderTrigger}>
      {({ hide }) => <AddOrInviteUser hide={hide} {...rest} />}
    </Modal>
  )
}

AddUserModal.propTypes = {
  renderTrigger: PropTypes.func.isRequired,
}

const AddOrInviteUser = ({
  title,
  description,
  resultsMessage,
  onSelectUser,
  hide,
  inviteEntity,
  inviteEntityId,
  inviteEntityTitle,
}) => {
  const [email, setEmail] = useState()
  const { data, isLoading } = useUsersByEmail(email)

  return (
    <>
      <h1 className={styles.title}>{title}</h1>
      {description}
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <InputButton
          type="search"
          placeholder="Search a user by email"
          btnLabel="Search"
          btntitle="Search"
          autoFocus
          onClick={setEmail}
          defaultValue={email}
        />
      )}
      {!!data && !isLoading && (
        <UserResults
          message={resultsMessage}
          users={data}
          onSelectUser={(uid) => {
            onSelectUser(uid)
            hide()
          }}
        />
      )}

      {inviteEntity && inviteEntityId && (
        <div className={styles.inviteLink}>
          <div className={styles.separator}>
            <small>If you can&apos;t find the user, share an invitation link</small>
          </div>
          <InviteLink
            entity={inviteEntity}
            entityId={inviteEntityId}
            entityTitle={inviteEntityTitle}
          />
        </div>
      )}
    </>
  )
}

AddOrInviteUser.propTypes = {
  title: PropTypes.string,
  description: PropTypes.node.isRequired,
  resultsMessage: PropTypes.node.isRequired,
  onSelectUser: PropTypes.func.isRequired,
  hide: PropTypes.func.isRequired,
  inviteEntity: PropTypes.string,
  inviteEntityId: PropTypes.string,
  inviteEntityTitle: PropTypes.string,
}

AddOrInviteUser.defaultProps = {
  title: 'Add a member',
  inviteEntity: undefined,
  inviteEntityId: undefined,
  inviteEntityTitle: '',
}

export default AddUserModal
