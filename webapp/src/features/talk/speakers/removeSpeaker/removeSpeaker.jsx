/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import PropTypes from 'prop-types'

import { useNotification } from 'app/layout/notification/context'
import { useRemoveSpeaker } from '../../../../data/talk'
import './removeSpeaker.css'

const RemoveSpeaker = ({ talkId, speakerId }) => {
  const { mutate: removeSpeaker } = useRemoveSpeaker(talkId, speakerId)
  const { sendError } = useNotification()

  const onRemoveSpeaker = () => {
    removeSpeaker(null, {
      onError: (err) => sendError(`An unexpected error has occurred: ${err.message}`),
    })
  }

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
  talkId: PropTypes.string.isRequired,
  speakerId: PropTypes.number.isRequired,
}

export default RemoveSpeaker
