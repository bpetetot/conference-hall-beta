import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import AddUserButton from 'components/addUser'

import './addSpeakerButton.css'

const ADD_SPEAKER_MODAL = 'add-speaker-modal'
const modalMessage = (
  <Fragment>
    <p>
      Search and add a co-speaker to your talk, he/she will be also able to update it and submit it
      to any event.<br />Your co-speaker must already have a Speaker Hall account.
    </p>
    <p>
      For security and privacy reasons, you can search a speaker only by his/her registered email
      address.
    </p>
  </Fragment>
)

const AddSpeakerButton = ({ onSelectUser, inviteLink }) => (
  <AddUserButton
    modalId={ADD_SPEAKER_MODAL}
    label="Add a co-speaker"
    modalOptions={{
      message: modalMessage,
      resultsMessage: 'Select a speaker for your talk',
      onSelectUser,
      inviteLink,
    }}
  />
)

AddSpeakerButton.propTypes = {
  onSelectUser: PropTypes.func.isRequired,
  inviteLink: PropTypes.string.isRequired,
}

export default AddSpeakerButton
