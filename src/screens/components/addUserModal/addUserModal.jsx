import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { Modal } from 'components/portals'
import CopyInput from 'components/copyInput'
import InputButton from 'components/form/inputButton'
import { LoadingIndicator } from 'components/loader'
import UserResults from './userResults'

import './addUserModal.css'

const AddUserModal = ({
  title,
  description,
  searching,
  initialized,
  email,
  users,
  resultsMessage,
  inviteLink,
  onSearch,
  onSelectUser,
  renderTrigger,
}) => (
  <Modal className="add-user-modal" renderTrigger={renderTrigger}>
    {({ hide }) => (
      <Fragment>
        <h1>{title}</h1>
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
            onSelectUser={(uid) => {
              onSelectUser(uid)
              hide()
            }}
          />
        )}
        {!!inviteLink && (
          <Fragment>
            <div className="user-search-separator">
              <small>or send him/her an invitation link</small>
            </div>
            <CopyInput title="Invite link" value={inviteLink} />
          </Fragment>
        )}
      </Fragment>
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
  inviteLink: PropTypes.string.isRequired,
  renderTrigger: PropTypes.func,
}

AddUserModal.defaultProps = {
  title: 'Add a member',
  email: undefined,
  searching: false,
  initialized: false,
  users: [],
  renderTrigger: undefined,
}

export default AddUserModal
