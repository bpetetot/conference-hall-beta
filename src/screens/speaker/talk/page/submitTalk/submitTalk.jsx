import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'redux-little-router'

import IconLabel from 'components/iconLabel'

const SubmitTalk = ({ talkId, eventId, eventName }) => {
  if (!eventId) return null
  return (
    <Link href={`/speaker/talk/${talkId}/submit`} className="btn btn-primary">
      <IconLabel icon="fa fa-paper-plane" label={`Submit to ${eventName}`} />
    </Link>
  )
}

SubmitTalk.propTypes = {
  talkId: PropTypes.string.isRequired,
  eventId: PropTypes.string,
  eventName: PropTypes.string,
}

SubmitTalk.defaultProps = {
  eventId: undefined,
  eventName: undefined,
}

export default SubmitTalk
