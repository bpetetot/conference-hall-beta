import React from 'react'
import PropTypes from 'prop-types'
import values from 'lodash/values'
import compact from 'lodash/compact'

import TotalRatings from 'features/ratings/totalRatings'
import TalkSelection from 'features/proposal/selection'

import './proposalInfo.css'

const ProposalInfo = ({ eventId, proposal, isMobile, deliberationActive, hideRatings }) => {
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
  deliberationActive: PropTypes.bool,
  hideRatings: PropTypes.bool,
}

ProposalInfo.defaultProps = {
  proposal: {},
  deliberationActive: false,
  hideRatings: false,
}

export default ProposalInfo
