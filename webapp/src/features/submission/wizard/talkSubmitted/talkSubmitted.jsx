import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import SubmitTalksLink from 'features/talk/submitTalksLink'
import './talkSubmitted.css'

const TalkSubmitted = ({ event }) => (
  <div className="icon-submitted">
    <h2>Congrats ! Talk successfully submitted to {event.name}</h2>
    <p>
      In order to help organizers for the selection and the event management, please don&apos;t
      forget to fill
    </p>
    <h2>
      <Link to="/speaker/profile">Your profile</Link>
    </h2>
    {event.surveyEnabled && <p>and</p>}
    {event.surveyEnabled && (
      <h2>
        <Link to={`/speaker/event/${event.id}/survey`}>The speaker survey</Link>
      </h2>
    )}
    <i className="fa fa-paper-plane-o" />
    <br />
    <SubmitTalksLink
      eventId={event.id}
      displayed={event.isCfpOpened}
      label="Want to submit or update an other talk ?"
    />
  </div>
)

TalkSubmitted.propTypes = {
  event: PropTypes.object.isRequired,
}

export default TalkSubmitted
