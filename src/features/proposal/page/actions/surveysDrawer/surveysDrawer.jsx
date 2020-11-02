import React from 'react'
import PropTypes from 'prop-types'

import { Drawer } from 'components/portals'
import Button from 'components/button'
import IconLabel from 'components/iconLabel'
import SurveyBlock from 'features/survey/block/surveyBlock'

const SpeakerSurveys = ({ eventId, userIds, survey }) => (
  <Drawer
    title="Speaker survey"
    renderTrigger={({ show }) => (
      <Button secondary onClick={show}>
        <IconLabel icon="fa fa-question-circle" label="Speaker survey" />
      </Button>
    )}
  >
    {userIds.map((userId) => (
      <SurveyBlock key={userId} eventId={eventId} userId={userId} survey={survey} />
    ))}
  </Drawer>
)

SpeakerSurveys.propTypes = {
  eventId: PropTypes.string.isRequired,
  userIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  survey: PropTypes.objectOf(PropTypes.bool).isRequired,
}

export default SpeakerSurveys
