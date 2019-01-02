import React from 'react'
import PropTypes from 'prop-types'

import { Drawer } from 'components/portals'
import Button from 'components/button'
import IconLabel from 'components/iconLabel'
import UserAvatar from 'screens/components/userAvatar'

import Answer from './answer'

import './speakerSurveys.css'

const SpeakerSurveys = ({ survey, responses }) => (
  <Drawer
    title="Speaker survey"
    renderTrigger={({ show }) => (
      <Button secondary onClick={show}>
        <IconLabel icon="fa fa-question-circle" label="Speaker survey" />
      </Button>
    )}
  >
    {responses.map(({ uid, response }) => (
      <div key={uid} className="speaker-surveys card">
        <UserAvatar id={uid} />
        {response ? (
          <div className="questions">
            {survey.gender && <Answer question="gender" answer={response.gender} />}
            {survey.tshirt && <Answer question="tshirt" answer={response.tshirt} />}
            {survey.diet && <Answer question="diet" answer={response.diet} />}
            {survey.accomodation && (
              <Answer question="accomodation" answer={response.accomodation} />
            )}
            {survey.transports && <Answer question="transports" answer={response.transports} />}
            {survey.info && <Answer question="info" answer={response.info} />}
          </div>
        ) : (
          <div className="not-answered">
            <small>Not answered</small>
          </div>
        )}
      </div>
    ))}
  </Drawer>
)

SpeakerSurveys.propTypes = {
  survey: PropTypes.objectOf(PropTypes.bool).isRequired,
  responses: PropTypes.arrayOf(PropTypes.any),
}

SpeakerSurveys.defaultProps = {
  responses: {},
}

export default SpeakerSurveys
