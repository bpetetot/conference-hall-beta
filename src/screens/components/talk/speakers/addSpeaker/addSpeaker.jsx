import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import AddUserModal from 'screens/components/addUserModal'

import './addSpeaker.css'

const AddSpeaker = ({ onSelectUser, inviteLink }) => (
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
    inviteLink={inviteLink}
    description={(
      <Fragment>
        <p>
          Search and add a co-speaker to your talk, he/she will be also able to update it and submit
          it to any event.<br />Your co-speaker must already have a Speaker Hall account.
        </p>
        <p>
          For security and privacy reasons, you can search a speaker only by his/her registered
          email address.
        </p>
      </Fragment>
    )}
  />
)

AddSpeaker.propTypes = {
  onSelectUser: PropTypes.func.isRequired,
  inviteLink: PropTypes.string.isRequired,
}

export default AddSpeaker
