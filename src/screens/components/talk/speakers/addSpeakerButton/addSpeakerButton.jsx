import React from 'react'

import './addSpeakerButton.css'

const AddSpeakerButton = () => (
  <a onClick="#" role="button" className="add-speaker-button">
    <span className="add-speaker-button-icon">
      <i className="fa fa-user fa-lg" />
    </span>
    <span className="add-speaker-button-label">Add a co-speaker</span>
  </a>
)

export default AddSpeakerButton
