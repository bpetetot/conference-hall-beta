import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import get from 'lodash/get'

import HasRole from 'features/organization/hasRole'
import Titlebar from 'components/titlebar'
import { ROLE_OWNER_OR_MEMBER } from 'firebase/constants'
import { useEvent } from 'features/event/useEvents'
import { useEventSettings } from 'features/event/useEventSettings'

import RatingsDrawer from './ratingsDrawer'
import SurveysDrawer from './surveysDrawer'
import ReviewersThread from './reviewersThread'
import EditProposal from './editProposal'
import styles from './actions.module.css'

const Actions = ({ eventId, proposal, className }) => {
  const { data: event } = useEvent(eventId)
  const { data: settings } = useEventSettings(eventId)
  const displayOrganizersRatings = get(settings, 'deliberation.displayRatings')

  return (
    <Titlebar className={cn(styles.header, className)} title={proposal.title}>
      <HasRole of={ROLE_OWNER_OR_MEMBER} forEventId={eventId}>
        <EditProposal eventId={eventId} proposal={proposal} />
        {displayOrganizersRatings && <RatingsDrawer eventId={eventId} proposalId={proposal.id} />}
        {event?.surveyActive && <SurveysDrawer eventId={eventId} proposalId={proposal.id} />}
      </HasRole>
      <ReviewersThread eventId={eventId} proposalId={proposal.id} />
    </Titlebar>
  )
}

Actions.propTypes = {
  eventId: PropTypes.string.isRequired,
  proposal: PropTypes.object.isRequired,
  className: PropTypes.string,
}

Actions.defaultProps = {
  className: undefined,
}

export default Actions
