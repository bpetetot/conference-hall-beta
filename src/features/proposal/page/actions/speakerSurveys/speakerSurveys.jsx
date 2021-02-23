import React from 'react'
import PropTypes from 'prop-types'

import { Drawer } from 'components/portals'
import Button from 'components/button'
import IconLabel from 'components/iconLabel'

import Answers from './answers'

import './speakerSurveys.css'

const SpeakerSurveys = ({ event, speakers }) => (
  <Drawer
    title="Speaker survey"
    renderTrigger={({ show }) => (
      <Button secondary onClick={show}>
        <IconLabel icon="fa fa-question-circle" label="Speaker survey" />
      </Button>
    )}
  >
    {speakers.map((speaker) => (
      <Answers key={speaker.id} event={event} speaker={speaker} />
    ))}
  </Drawer>
)

SpeakerSurveys.propTypes = {
  event: PropTypes.object.isRequired,
  speakers: PropTypes.array.isRequired,
}

export default SpeakerSurveys
