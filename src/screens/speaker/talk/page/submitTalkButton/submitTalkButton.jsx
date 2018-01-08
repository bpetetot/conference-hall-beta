import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'redux-little-router'

import IconLabel from 'components/iconLabel'

const SubmitTalkButton = ({
  talkId, eventId, eventName, cfpOpened,
}) => {
  if (!cfpOpened || !eventId) return null
  return (
    <Link href={`/speaker/talk/${talkId}/submit`} className="btn btn-primary">
      <IconLabel icon="fa fa-paper-plane" label={`Submit to ${eventName}`} />
    </Link>
  )
}

SubmitTalkButton.propTypes = {
  talkId: PropTypes.string.isRequired,
  eventId: PropTypes.string,
  eventName: PropTypes.string,
  cfpOpened: PropTypes.bool,
}

SubmitTalkButton.defaultProps = {
  eventId: undefined,
  eventName: undefined,
  cfpOpened: false,
}

export default SubmitTalkButton
