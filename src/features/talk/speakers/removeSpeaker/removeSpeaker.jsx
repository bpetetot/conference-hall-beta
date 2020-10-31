/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import PropTypes from 'prop-types'
import { useRemoveSpeaker } from 'features/talk/useTalks'

import './removeSpeaker.css'

const RemoveSpeaker = ({ talkId, uid }) => {
  const removeSpeaker = useRemoveSpeaker(talkId)
  return (
    <a role="button" className="remove-speaker" onClick={() => removeSpeaker(uid)}>
      <i className="fa fa-trash fa-lg" />
    </a>
  )
}

RemoveSpeaker.propTypes = {
  talkId: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
}

export default RemoveSpeaker
