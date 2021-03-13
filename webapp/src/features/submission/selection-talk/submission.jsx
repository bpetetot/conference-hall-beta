import React from 'react'
import PropTypes from 'prop-types'

import Stepper from 'components/stepper'
import EventTitle from 'features/event/eventTitle'

import TalksSelection from './talksSelection'
import './submission.css'

const steps = [
  { label: 'Talk selection', icon: 'fa fa-bars' },
  { label: 'Talk details', icon: 'fa fa-microphone' },
  { label: 'Event submission', icon: 'fa fa-calendar-check-o' },
  { label: 'Done !', icon: 'fa fa-paper-plane' },
]

const Submission = ({ event }) => {
  if (!event.isCfpOpened) {
    return <div>Call for paper not opened.</div>
  }
  return (
    <div className="submitWizard">
      <EventTitle name={event.name} subtitle="Talk submission" />
      <Stepper steps={steps} currentStep={0} />
      <TalksSelection eventId={event.id} />
    </div>
  )
}

Submission.propTypes = {
  event: PropTypes.object.isRequired,
}

export default Submission
