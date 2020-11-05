import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import values from 'lodash/values'
import compact from 'lodash/compact'

import TotalRatings from 'features/ratings/totalRatings'
import TalkSelection from 'features/proposal/selection'

import './proposalInfo.css'
import { useEventSettings } from 'features/event/useEventSettings'

const ProposalInfo = ({ eventId, proposal, isMobile }) => {
  const { data: settings } = useEventSettings(eventId)
  const hideRatings = get(settings, 'deliberation.hideRatings')
  const deliberationActive = get(settings, 'deliberation.enabled')

  const { id, rating, loves, hates, noopinion, usersRatings } = proposal

  const nbVotes = compact(values(usersRatings)).length

  return (
    <div className="proposal-item-info">
      {!isMobile && deliberationActive && <TalkSelection eventId={eventId} proposalId={id} />}
      {!hideRatings && (
        <TotalRatings
          rating={rating}
          loves={loves}
          hates={hates}
          noopinion={noopinion}
          nbvotes={nbVotes}
        />
      )}
    </div>
  )
}

ProposalInfo.propTypes = {
  eventId: PropTypes.string.isRequired,
  proposal: PropTypes.objectOf(PropTypes.any),
  isMobile: PropTypes.bool.isRequired,
}

ProposalInfo.defaultProps = {
  proposal: {},
}

export default ProposalInfo
