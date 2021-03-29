import PropTypes from 'prop-types'

import Badge from 'components/badge'
import React from 'react'

const TalkStatus = ({ status }) => {
  return (
    <Badge
      info={status === 'SUBMITTED'}
      success={status === 'CONFIRMED' || status === 'ACCEPTED'}
      error={status === 'REJECTED'}
      warning={status === 'DECLINED'}
      outline={status !== 'ACCEPTED'}
    >
      {status}
    </Badge>
  )
}

TalkStatus.propTypes = {
  status: PropTypes.string.isRequired,
}

export default TalkStatus
