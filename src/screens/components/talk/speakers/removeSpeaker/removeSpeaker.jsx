import React from 'react'
import PropTypes from 'prop-types'

import './removeSpeaker.css'

const RemoveSpeaker = ({ onRemoveSpeaker }) => (
  <a role="button" className="remove-speaker" onClick={onRemoveSpeaker}>
    <i className="fa fa-trash fa-lg" />
  </a>
)

RemoveSpeaker.propTypes = {
  onRemoveSpeaker: PropTypes.func.isRequired,
}

export default RemoveSpeaker
