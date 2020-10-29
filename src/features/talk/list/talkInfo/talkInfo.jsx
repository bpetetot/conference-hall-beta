import React from 'react'
import PropTypes from 'prop-types'
import Badge from 'components/badge'

import './talkInfo.css'
import { Link } from 'react-router-dom'

const TalkInfo = ({ id, archived, submissions }) => {
  if (archived) {
    return (
      <Badge light outline>
        Archived
      </Badge>
    )
  }

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
      <Link to={`/speaker/talk/${id}/submission`}>Submit</Link>
    </small>
  )
}

TalkInfo.propTypes = {
  id: PropTypes.string.isRequired,
  archived: PropTypes.bool,
  submissions: PropTypes.objectOf(PropTypes.any),
}

TalkInfo.defaultProps = {
  archived: false,
  submissions: undefined,
}

export default TalkInfo
