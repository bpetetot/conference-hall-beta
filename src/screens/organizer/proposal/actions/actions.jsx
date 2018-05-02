import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import IconLabel from 'components/iconLabel'
import Drawer from 'components/drawer'
import TeamRatings from './teamRatings'
import SpeakerSurveys from './speakerSurveys'

import './actions.css'

const Actions = ({
  eventId, proposal, surveyActive, className,
}) => (
  <div className={cn('proposal-actions-btn', className)}>
    <Drawer
      opener={open => (
        <button className="btn btn-default" onClick={open}>
          <IconLabel icon="fa fa-star" label="All ratings" />
        </button>
      )}
      title="Team ratings"
      content={<TeamRatings id={proposal.id} />}
    />

    {surveyActive && (
      <Drawer
        opener={open => (
          <button className="btn btn-default" onClick={open}>
            <IconLabel icon="fa fa-question-circle" label="Speaker survey" />
          </button>
        )}
        title="Speaker survey"
        content={<SpeakerSurveys eventId={eventId} speakers={proposal.speakers} />}
      />
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
