import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { withModal } from 'components/modal'
import AddSpeakerModal from './addSpeakerModal.container'
import './addSpeakerButton.css'

const ADD_SPEAKER_MODAL = 'add-speaker-modal'

const AddSpeakerButton = ({ openModal }) => (
  <Fragment>
    <a onClick={openModal} role="button" className="add-speaker-button">
      <span className="add-speaker-button-icon">
        <i className="fa fa-user fa-lg" />
      </span>
      <span className="add-speaker-button-label">Add a speaker</span>
    </a>
    <AddSpeakerModal modalId={ADD_SPEAKER_MODAL} />
  </Fragment>
)

AddSpeakerButton.propTypes = {
  openModal: PropTypes.func.isRequired,
}

export default withModal(ADD_SPEAKER_MODAL)(AddSpeakerButton)
