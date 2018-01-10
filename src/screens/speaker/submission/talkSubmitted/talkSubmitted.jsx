import React from 'react'
import PropTypes from 'prop-types'

import SubmitTalksLink from 'screens/components/submitTalksLink'
import './talkSubmitted.css'

const TalkSubmitted = ({ eventId, eventName }) => (
  <div className="icon-submitted">
    <i className="fa fa-paper-plane-o" />
    <h2>Congrats ! Talk successfully submitted to {eventName}</h2>
    <SubmitTalksLink eventId={eventId} label="Want to submit an other talk ?" />
  </div>
)

TalkSubmitted.propTypes = {
  eventId: PropTypes.string.isRequired,
  eventName: PropTypes.string.isRequired,
}

export default TalkSubmitted
