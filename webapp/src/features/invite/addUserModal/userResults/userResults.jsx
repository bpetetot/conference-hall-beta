import React from 'react'
import PropTypes from 'prop-types'

import Avatar from 'components/avatar'
import './userResults.css'

const UserResults = ({ users, message, onSelectUser, isError }) => {
  if (users.length === 0 || isError) {
    return (
      <div className="users-no-result">
        <strong>No user found !</strong>
        <div>You may have a wrong email address or the user didn&apos;t signup yet</div>
      </div>
    )
  }
  return (
    <div className="users-result">
      <h3>{message}</h3>
      {users.map(({ id, name, photoURL }) => (
        <div key={id} onClick={() => onSelectUser(id)} role="button">
          <Avatar src={photoURL} name={name} withLabel />
        </div>
      ))}
    </div>
  )
}

UserResults.propTypes = {
  users: PropTypes.array,
  onSelectUser: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  isError: PropTypes.bool,
}

UserResults.defaultProps = {
  users: [],
  isError: false,
}

export default UserResults
