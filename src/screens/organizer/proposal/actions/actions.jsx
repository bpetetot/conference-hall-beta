import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Titlebar from 'components/titlebar'

import TeamRatings from './teamRatings'
import SpeakerSurveys from './speakerSurveys'
import OrganizersThread from './organizersThread'
import EditProposal from './editProposal'
import styles from './actions.module.css'

const Actions = ({ eventId, proposal, surveyActive, displayOrganizersRatings, className }) => (
  <Titlebar className={cn(styles.header, className)} title={proposal.title}>
    <EditProposal eventId={eventId} proposal={proposal} />

    {displayOrganizersRatings && <TeamRatings proposalId={proposal.id} />}

    {surveyActive && <SpeakerSurveys eventId={eventId} proposalId={proposal.id} />}

    <OrganizersThread eventId={eventId} proposalId={proposal.id} />
  </Titlebar>
)

Actions.propTypes = {
  eventId: PropTypes.string.isRequired,
  proposal: PropTypes.object.isRequired,
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
