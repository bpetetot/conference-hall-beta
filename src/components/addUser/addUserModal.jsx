import React from 'react'
import PropTypes from 'prop-types'

import Modal from 'components/modal'
import CopyInput from 'components/copyInput'
import InputButton from 'components/form/inputButton'
import { LoadingIndicator } from 'components/loader'
import UserResults from './userResults'
import './addUserModal.css'

const AddUserModal = ({
  modalId,
  initialized,
  email,
  searching,
  users,
  onSearch,
  title,
  message,
  resultsMessage,
  inviteLink,
  onSelectUser,
}) => (
  <Modal id={modalId} className="add-user-modal">
    <h1>{title}</h1>
    {message}
    {!searching && (
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
    {searching && <LoadingIndicator />}
    {initialized && !searching && (
      <UserResults message={resultsMessage} users={users} onSelectUser={onSelectUser} />
    )}
    <div className="user-search-separator">
      <small>or send him/her an invitation link</small>
    </div>
    <CopyInput title="Invite link" value={inviteLink} />
  </Modal>
)

AddUserModal.propTypes = {
  modalId: PropTypes.string.isRequired,
  inviteLink: PropTypes.string.isRequired,
  message: PropTypes.node.isRequired,
  resultsMessage: PropTypes.node.isRequired,
  onSearch: PropTypes.func.isRequired,
  onSelectUser: PropTypes.func.isRequired,
  title: PropTypes.string,
  email: PropTypes.string,
  searching: PropTypes.bool,
  initialized: PropTypes.bool,
  users: PropTypes.arrayOf(PropTypes.string),
}


AddUserModal.defaultProps = {
  title: 'Add a user',
  email: undefined,
  searching: false,
  initialized: false,
  users: [],
}

export default AddUserModal
