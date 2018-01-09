import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'redux-little-router'

import IconLabel from 'components/iconLabel'

const SubmitTalkButton = ({
  talkId, eventName, displayed, submitted,
}) => {
  if (!displayed) return null
  const label = !submitted ? `Submit to ${eventName}` : `Update submission to ${eventName}`
  return (
    <Link href={`/speaker/talk/${talkId}/submit`} className="btn btn-primary">
      <IconLabel icon="fa fa-paper-plane" label={label} />
    </Link>
  )
}

SubmitTalkButton.propTypes = {
  talkId: PropTypes.string.isRequired,
  eventName: PropTypes.string,
  displayed: PropTypes.bool,
  submitted: PropTypes.bool,
}

SubmitTalkButton.defaultProps = {
  eventName: undefined,
  displayed: false,
  submitted: false,
}

export default SubmitTalkButton
