import React from 'react'
import PropTypes from 'prop-types'

import UserAvatar from 'screens/components/userAvatar'
import './userResults.css'

const UserResults = ({ users, message, onSelectUser }) => {
  if (users.length === 0) {
    return (
      <div className="users-no-result">
        <strong>No user found !</strong>
        <div>
          You may have a wrong email address or the user didn&apos;t signup yet
        </div>
      </div>
    )
  }
  return (
    <div className="users-result">
      <h3>{message}</h3>
      {users.map(uid => (
        <div key={uid} onClick={() => onSelectUser(uid)} role="button">
          <UserAvatar id={uid} />
        </div>
      ))}
    </div>
  )
}

UserResults.propTypes = {
  users: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelectUser: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
}

export default UserResults
