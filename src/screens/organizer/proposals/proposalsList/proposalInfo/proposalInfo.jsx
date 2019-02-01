import React from 'react'
import PropTypes from 'prop-types'
import values from 'lodash/values'
import compact from 'lodash/compact'

import TotalRatings from 'screens/organizer/components/totalRatings'
import TalkSelection from 'screens/organizer/components/talkSelection'

import './proposalInfo.css'

const ProposalInfo = ({ proposal, isMobile, deliberationActive }) => {
  const {
    id, rating, loves, hates, noopinion, usersRatings,
  } = proposal

  const nbVotes = compact(values(usersRatings)).length

  return (
    <div className="proposal-item-info">
      {(!isMobile && deliberationActive) && <TalkSelection proposalId={id} />}
      <TotalRatings
        rating={rating}
        loves={loves}
        hates={hates}
        noopinion={noopinion}
        nbvotes={nbVotes}
      />
    </div>
  )
}

ProposalInfo.propTypes = {
  proposal: PropTypes.objectOf(PropTypes.any),
  isMobile: PropTypes.bool.isRequired,
  deliberationActive: PropTypes.bool,
}

ProposalInfo.defaultProps = {
  proposal: {},
  deliberationActive: false,
}

export default ProposalInfo
