import React from 'react'
import PropTypes from 'prop-types'

import Stepper from 'components/stepper'
import { TalkTitle } from 'features/talk'
import EventsSelection from './eventsSelection'

import './submission.css'

const steps = [
  { label: 'Event selection', icon: 'fa fa-bars' },
  { label: 'Talk details', icon: 'fa fa-microphone' },
  { label: 'Event submission', icon: 'fa fa-calendar-check-o' },
  { label: 'Done !', icon: 'fa fa-paper-plane' },
]

function Submission({ talkId, talkTitle }) {
  if (!talkId) return null
  return (
    <div className="submission">
      <TalkTitle name={talkTitle} />
      <Stepper steps={steps} currentStep={0} />
      <EventsSelection talkId={talkId} />
    </div>
  )
}

Submission.propTypes = {
  talkId: PropTypes.string,
  talkTitle: PropTypes.string,
}

Submission.defaultProps = {
  talkId: undefined,
  talkTitle: '',
}

export default Submission
