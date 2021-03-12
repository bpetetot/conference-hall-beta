/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import PropTypes from 'prop-types'

import { useRemoveSpeaker } from '../../../../data/talk'
import './removeSpeaker.css'

const RemoveSpeaker = ({ talkId, speakerId }) => {
  const { mutate: onRemoveSpeaker } = useRemoveSpeaker(talkId, speakerId)
  return (
    <a
      role="button"
      className="remove-speaker"
      onClick={onRemoveSpeaker}
      arial-label="Remove co-speaker"
    >
      <i className="fa fa-trash fa-lg" />
    </a>
  )
}

RemoveSpeaker.propTypes = {
  talkId: PropTypes.number.isRequired,
  speakerId: PropTypes.number.isRequired,
}

export default RemoveSpeaker
