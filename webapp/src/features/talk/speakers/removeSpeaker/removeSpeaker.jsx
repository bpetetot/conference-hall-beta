/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router'

import { useAuth } from 'features/auth'
import { useNotification } from 'app/layout/notification/context'
import { useRemoveSpeaker } from '../../../../data/talk'
import './removeSpeaker.css'

const RemoveSpeaker = ({ talkId, speakerId }) => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { mutate: removeSpeaker } = useRemoveSpeaker(talkId, speakerId)
  const { sendError } = useNotification()

  const onRemoveSpeaker = () => {
    removeSpeaker(null, {
      onError: (err) => sendError(`An unexpected error has occurred: ${err.message}`),
      onSuccess: () => {
        if (speakerId === user.id) navigate('/speaker')
      },
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
