import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'redux-little-router'

import SubmitTalksLink from 'screens/components/submitTalksLink'
import './talkSubmitted.css'

const TalkSubmitted = ({ eventId, eventName }) => (
  <div className="icon-submitted">
    <h2>Congrats ! Talk successfully submitted to {eventName}</h2>
    <h1><Link href={`/speaker/event/${eventId}/survey`}>Please fill the speaker survey</Link></h1>
    <i className="fa fa-paper-plane-o" />
    <br />
    <SubmitTalksLink eventId={eventId} label="Want to submit or update an other talk ?" />
  </div>
)

TalkSubmitted.propTypes = {
  eventId: PropTypes.string.isRequired,
  eventName: PropTypes.string.isRequired,
}

export default TalkSubmitted
