import React from 'react'
import PropTypes from 'prop-types'
import Badge from 'components/badge'

import './talkInfo.css'
import { Link } from 'react-router-dom'

const TalkInfo = ({ id, archived, proposals }) => {
  if (archived) {
    return (
      <Badge light outline>
        Archived
      </Badge>
    )
  }

  let message
  if (!proposals || proposals.length === 0) {
    message = 'Not submitted yet'
  } else if (proposals.length === 1) {
    message = '1 submission'
  } else {
    message = `${proposals.length} proposals`
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
  id: PropTypes.number.isRequired,
  archived: PropTypes.bool,
  proposals: PropTypes.array,
}

TalkInfo.defaultProps = {
  archived: false,
  proposals: [],
}

export default TalkInfo
