import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@k-redux-router/react-k-ramel'

import './talkInfo.css'

const TalkInfo = ({ id, submissions }) => {
  let message
  if (!submissions) {
    message = 'Not submitted yet'
  } else if (Object.keys(submissions).length === 1) {
    message = '1 submission'
  } else {
    message = `${Object.keys(submissions).length} submissions`
  }

  return (
    <small>
      <span>{message}</span>
      <span className="talk-info-space">|</span>
      <Link code="speaker-talk-submission" talkId={id} onClick={e => e.stopPropagation()}>
        Submit
      </Link>
    </small>
  )
}

TalkInfo.propTypes = {
  id: PropTypes.string.isRequired,
  submissions: PropTypes.objectOf(PropTypes.any),
}

TalkInfo.defaultProps = {
  submissions: undefined,
}

export default TalkInfo
