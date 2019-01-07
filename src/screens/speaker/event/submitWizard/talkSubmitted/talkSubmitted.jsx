import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@k-redux-router/react-k-ramel'

import SubmitTalksLink from 'screens/components/submitTalksLink'
import './talkSubmitted.css'

const TalkSubmitted = ({ eventId, eventName, surveyActive }) => (
  <div className="icon-submitted">
    <h2>Congrats ! Talk successfully submitted to {eventName}</h2>
    <p>
      In order to help organizers for the selection and the event management, please don&apos;t
      forget to fill
    </p>
    <h2>
      <Link code="speaker-profile">Your profile</Link>
    </h2>
    {surveyActive && <p>and</p>}
    {surveyActive && (
      <h2>
        <Link code="speaker-event-survey" eventId={eventId}>The speaker survey</Link>
      </h2>
    )}
    <i className="fa fa-paper-plane-o" />
    <br />
    <SubmitTalksLink eventId={eventId} label="Want to submit or update an other talk ?" />
  </div>
)

TalkSubmitted.propTypes = {
  eventId: PropTypes.string.isRequired,
  eventName: PropTypes.string.isRequired,
  surveyActive: PropTypes.bool,
}

TalkSubmitted.defaultProps = {
  surveyActive: false,
}

export default TalkSubmitted
