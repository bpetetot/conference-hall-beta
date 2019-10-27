/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import PropTypes from 'prop-types'
import AddUserModal from 'screens/components/addUserModal'

import './addSpeaker.css'

const AddSpeaker = ({ onSelectUser }) => (
  <AddUserModal
    title="co-speaker"
    renderTrigger={({ show }) => (
      <a onClick={show} role="button" className="add-speaker-button">
        <span className="add-speaker-button-icon">
          <i className="fa fa-user fa-lg" />
        </span>
        <span className="add-speaker-button-label">Add a co-speaker</span>
      </a>
    )}
    resultsMessage="Select a speaker for your talk"
    onSelectUser={onSelectUser}
    description={(
      <>
        <p>
          Search and add a co-speaker to your talk, he/she will be also able to update it and submit
          it to any event.
          <br />
          Your co-speaker must already have a Conference Hall account.
        </p>
        <p>
          For security and privacy reasons, you can search a speaker only by his/her registered
          email address.
        </p>
      </>
)}
  />
)

AddSpeaker.propTypes = {
  onSelectUser: PropTypes.func.isRequired,
}

export default AddSpeaker
