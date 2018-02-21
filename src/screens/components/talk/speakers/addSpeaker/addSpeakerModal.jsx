import React from 'react'
import PropTypes from 'prop-types'

import Modal from 'components/modal'
import InputButton from 'components/form/inputButton'
import CopyInput from 'components/copyInput'
import { LoadingIndicator } from 'components/loader'
import SpeakerResults from './speakerResults'
import './addSpeakerModal.css'

const AddSpeakerModal = ({
  modalId, initialized, email, searching, speakers, onSearch,
}) => (
  <Modal id={modalId} className="add-speaker-modal">
    <h1>Add a speaker</h1>
    <p>
      Search and add a speaker to your talk, he/she will be also able to update and submit it to any
      event. The speaker must already have a Speaker Hall account.
    </p>
    <p>
      For security and privacy reasons, you can search a speaker only by his/her registered email
      address.
    </p>
    {!searching && (
      <InputButton
        type="search"
        placeholder="Search a speaker by email"
        btnLabel="Search"
        autoFocus
        defaultValue={email}
        onClick={onSearch}
      />
    )}
    {searching && <LoadingIndicator />}
    {initialized && !searching && <SpeakerResults speakers={speakers} />}
    <div className="speaker-search-separator">
      <small>or send him/her an invite link to your talk</small>
    </div>
    <CopyInput title="Invite link" value="http://localhost/speaker/invite/talk/id" />
  </Modal>
)

AddSpeakerModal.propTypes = {
  modalId: PropTypes.string.isRequired,
  email: PropTypes.string,
  searching: PropTypes.bool,
  initialized: PropTypes.bool,
  speakers: PropTypes.arrayOf(PropTypes.string),
  onSearch: PropTypes.func.isRequired,
}

AddSpeakerModal.defaultProps = {
  email: undefined,
  initialized: false,
  searching: false,
  speakers: [],
}

export default AddSpeakerModal
