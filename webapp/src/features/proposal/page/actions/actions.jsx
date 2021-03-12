import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import HasRole from 'features/organization/hasRole'
import Titlebar from 'components/titlebar'
import { ROLE_OWNER_OR_MEMBER } from 'features/organization/constants'

import TeamRatings from './teamRatings'
import SpeakerSurveys from './speakerSurveys'
import ReviewersThread from './reviewersThread'
import EditProposal from './editProposal'
import styles from './actions.module.css'

const Actions = ({ event, proposal, className }) => (
  <Titlebar className={cn(styles.header, className)} title={proposal.title}>
    <HasRole of={ROLE_OWNER_OR_MEMBER} forEvent={event}>
      <EditProposal event={event} proposal={proposal} />
      {event.displayOrganizersRatings && (
        <TeamRatings ratings={proposal.ratings} stats={proposal.ratingStats} />
      )}
      {event.surveyEnabled && <SpeakerSurveys event={event} speakers={proposal.speakers} />}
    </HasRole>
    <ReviewersThread eventId={event.id} proposalId={proposal.id} />
  </Titlebar>
)

Actions.propTypes = {
  event: PropTypes.object.isRequired,
  proposal: PropTypes.object.isRequired,
  className: PropTypes.string,
}

Actions.defaultProps = {
  className: undefined,
}

export default Actions
