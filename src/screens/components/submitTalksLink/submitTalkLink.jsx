import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'redux-little-router'

import IconLabel from 'components/iconLabel'

const SubmitTalkLink = ({ eventId, displayed, className }) => {
  if (!displayed) return null
  return (
    <Link href={`/speaker/talks/submit?eventId=${eventId}`} className={className}>
      <IconLabel icon="fa fa-paper-plane" label="Submit a talk" />
    </Link>
  )
}

SubmitTalkLink.propTypes = {
  eventId: PropTypes.string,
  displayed: PropTypes.bool,
  className: PropTypes.string,
}

SubmitTalkLink.defaultProps = {
  eventId: undefined,
  displayed: false,
  className: undefined,
}

export default SubmitTalkLink
