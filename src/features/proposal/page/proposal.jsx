import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'

import { useAuth } from 'features/auth'
import { useEventSettings } from 'features/event/useEventSettings'

import Talk from './talk'
import Speakers from './speakers'
import Ratings from './ratings'
import Actions from './actions'

import './proposal.css'

const Proposal = ({ eventId, proposal }) => {
  const { user } = useAuth()

  const { data: settings } = useEventSettings(eventId)
  const deliberationActive = get(settings, 'deliberation.enabled')
  const blindRating = get(settings, 'deliberation.blindRating')

  return (
    <div className="proposal">
      <Actions className="proposal-actions" eventId={eventId} proposal={proposal} />
      <Ratings
        className="proposal-ratings"
        userId={user.uid}
        eventId={eventId}
        proposalId={proposal.id}
      />
      {!blindRating && <Speakers className="proposal-speakers" proposal={proposal} />}
      <Talk
        className="proposal-talk"
        eventId={eventId}
        proposal={proposal}
        deliberationActive={deliberationActive}
      />
    </div>
  )
}

Proposal.propTypes = {
  eventId: PropTypes.string.isRequired,
  proposal: PropTypes.objectOf(PropTypes.any),
}

Proposal.defaultProps = {
  proposal: {},
}

export default Proposal
