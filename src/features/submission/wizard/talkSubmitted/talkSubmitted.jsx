import React from 'react'
import { Link } from 'react-router-dom'

import SubmitTalkLink from 'features/talk/components/submitTalksLink'
import './talkSubmitted.css'
import { useCurrentEvent } from 'features/event/currentEventContext'

const TalkSubmitted = () => {
  const { data: event } = useCurrentEvent()

  return (
    <div className="icon-submitted">
      <h2>Congrats ! Talk successfully submitted to {event.name}</h2>
      <p>
        In order to help organizers for the selection and the event management, please don&apos;t
        forget to fill
      </p>
      <h2>
        <Link to="/speaker/profile">Your profile</Link>
      </h2>
      {event.surveyActive && (
        <>
          <p>and</p>
          <h2>
            <Link to={`/speaker/event/${event.id}/survey`}>The speaker survey</Link>
          </h2>
        </>
      )}
      <i className="fa fa-paper-plane-o" />
      <br />
      <SubmitTalkLink eventId={event.id} label="Want to submit or update an other talk ?" />
    </div>
  )
}

export default TalkSubmitted
