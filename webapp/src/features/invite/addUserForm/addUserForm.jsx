import React, { useState } from 'react'
import PropTypes from 'prop-types'

import InputButton from 'components/form/inputButton'
import LoadingIndicator from 'components/loader'
import UserResults from './userResults'
import InviteLink from './inviteLink'
import styles from './addUserForm.module.css'
import { useSearchUserByEmail } from '../../../data/user'

const AddUserForm = ({
  title,
  description,
  resultsMessage,
  inviteUrl,
  isLoadingInvite,
  onSelectUser,
  onClose,
  onGenerateInvite,
  onRevokeInvite,
}) => {
  const [email, setEmail] = useState(null)
  const { data: users, isLoading, isError } = useSearchUserByEmail(email)

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
          aria-label="Search a user by email"
          btnLabel="Search"
          btntitle="Search"
          autoFocus
          onClick={setEmail}
          defaultValue={email}
        />
      )}
      {((!!users && !isLoading) || isError) && (
        <UserResults
          message={resultsMessage}
          users={users}
          isError={isError}
          onSelectUser={(id) => {
            onSelectUser(id)
            onClose()
          }}
        />
      )}

      <div className={styles.inviteLink}>
        <div className={styles.separator}>
          <small>If you can&apos;t find the user, share an invitation link</small>
        </div>
        <InviteLink
          inviteUrl={inviteUrl}
          onGenerateInvite={onGenerateInvite}
          onRevokeInvite={onRevokeInvite}
          isLoadingInvite={isLoadingInvite}
        />
      </div>
    </>
  )
}

AddUserForm.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.node.isRequired,
  resultsMessage: PropTypes.node.isRequired,
  inviteUrl: PropTypes.string,
  isLoadingInvite: PropTypes.bool,
  onSelectUser: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onGenerateInvite: PropTypes.func.isRequired,
  onRevokeInvite: PropTypes.func.isRequired,
}

AddUserForm.defaultProps = {
  inviteUrl: undefined,
  isLoadingInvite: false,
}

export default AddUserForm
