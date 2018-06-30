import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import { Drawer } from 'components/portals'
import Button from 'components/button'
import IconLabel from 'components/iconLabel'
import TeamRatings from './teamRatings'
import SpeakerSurveys from './speakerSurveys'

import './actions.css'

const Actions = ({
  eventId, proposal, surveyActive, className,
}) => (
  <div className={cn('proposal-actions-btn', className)}>
    <Drawer
      title="Team ratings"
      renderTrigger={({ show }) => (
        <Button secondary onClick={show}>
          <IconLabel icon="fa fa-star" label="All ratings" />
        </Button>
      )}
    >
      <TeamRatings id={proposal.id} />
    </Drawer>

    {surveyActive && (
      <Drawer
        title="Speaker survey"
        renderTrigger={({ show }) => (
          <Button secondary onClick={show}>
            <IconLabel icon="fa fa-question-circle" label="Speaker survey" />
          </Button>
        )}
      >
        <SpeakerSurveys eventId={eventId} speakers={proposal.speakers} />
      </Drawer>
    )}
  </div>
)

Actions.propTypes = {
  eventId: PropTypes.string.isRequired,
  proposal: PropTypes.objectOf(PropTypes.any),
  surveyActive: PropTypes.bool,
  className: PropTypes.string,
}

Actions.defaultProps = {
  proposal: {},
  surveyActive: false,
  className: undefined,
}

export default Actions
