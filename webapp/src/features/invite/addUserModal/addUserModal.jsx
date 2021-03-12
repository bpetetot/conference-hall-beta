import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Modal } from 'components/portals'
import InputButton from 'components/form/inputButton'
import { LoadingIndicator } from 'components/loader'
import UserResults from './userResults'

// import InviteLink from './inviteLink'
import styles from './addUserModal.module.css'
import { useSearchUserByEmail } from '../../../data/user'

const AddUserModal = ({
  title,
  description,
  resultsMessage,
  onSelectUser,
  renderTrigger,
  // inviteEntity,
  // inviteEntityId,
  // inviteEntityTitle,
}) => {
  const [email, setEmail] = useState(null)
  const { data: users, isLoading } = useSearchUserByEmail(email)

  return (
    <Modal renderTrigger={renderTrigger}>
      {({ hide }) => (
        <>
          <h1 className={styles.title}>{title}</h1>
          {description}
          {isLoading ? (
            <LoadingIndicator />
          ) : (
            <InputButton
              type="search"
              placeholder="Search a user by email"
              aria-label="Search a user by email"
              btnLabel="Search"
              btntitle="Search"
              autoFocus
              onClick={setEmail}
              defaultValue={email}
            />
          )}
          {!!users && !isLoading && (
            <UserResults
              message={resultsMessage}
              users={users}
              onSelectUser={(id) => {
                onSelectUser(id)
                hide()
              }}
            />
          )}

          {/* {inviteEntity && inviteEntityId && (
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
          )} */}
        </>
      )}
    </Modal>
  )
}

AddUserModal.propTypes = {
  title: PropTypes.string,
  description: PropTypes.node.isRequired,
  resultsMessage: PropTypes.node.isRequired,
  onSelectUser: PropTypes.func.isRequired,
  renderTrigger: PropTypes.func,
  // inviteEntity: PropTypes.string,
  // inviteEntityId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  // inviteEntityTitle: PropTypes.string,
}

AddUserModal.defaultProps = {
  title: 'Add a member',
  renderTrigger: undefined,
  // inviteEntity: undefined,
  // inviteEntityId: undefined,
  // inviteEntityTitle: '',
}

export default AddUserModal
