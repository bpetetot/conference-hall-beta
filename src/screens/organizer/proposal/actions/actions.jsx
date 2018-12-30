import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Titlebar from 'components/titlebar'
import { Drawer } from 'components/portals'
import Button from 'components/button'
import IconLabel from 'components/iconLabel'
import TeamRatings from './teamRatings'
import SpeakerSurveys from './speakerSurveys'

import styles from './actions.module.css'

const Actions = ({
  eventId, proposal, surveyActive, displayOrganizersRatings, className,
}) => (
  <Titlebar className={cn(styles.header, className)} title={proposal.title}>
    {displayOrganizersRatings && (
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
    )}

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

    <Drawer
      title="Organizers thread"
      renderTrigger={({ show }) => (
        <Button secondary onClick={show}>
          <IconLabel icon="fa fa-comments" label="Organizers thread" />
        </Button>
      )}
    >
      Discuss between organizers about the proposal.
    </Drawer>
  </Titlebar>
)

Actions.propTypes = {
  eventId: PropTypes.string.isRequired,
  proposal: PropTypes.objectOf(PropTypes.any),
  displayOrganizersRatings: PropTypes.bool,
  surveyActive: PropTypes.bool,
  className: PropTypes.string,
}

Actions.defaultProps = {
  proposal: {},
  displayOrganizersRatings: false,
  surveyActive: false,
  className: undefined,
}

export default Actions
