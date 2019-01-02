import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Titlebar from 'components/titlebar'

import TeamRatings from './teamRatings'
import SpeakerSurveys from './speakerSurveys'
import OrganizersThread from './organizersThread'
import styles from './actions.module.css'

const Actions = ({
  eventId, proposalId, title, surveyActive, displayOrganizersRatings, className,
}) => (
  <Titlebar className={cn(styles.header, className)} title={title}>
    {displayOrganizersRatings && <TeamRatings proposalId={proposalId} />}

    {surveyActive && <SpeakerSurveys eventId={eventId} proposalId={proposalId} />}

    <OrganizersThread eventId={eventId} proposalId={proposalId} />
  </Titlebar>
)

Actions.propTypes = {
  eventId: PropTypes.string.isRequired,
  proposalId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  displayOrganizersRatings: PropTypes.bool,
  surveyActive: PropTypes.bool,
  className: PropTypes.string,
}

Actions.defaultProps = {
  displayOrganizersRatings: false,
  surveyActive: false,
  className: undefined,
}

export default Actions
