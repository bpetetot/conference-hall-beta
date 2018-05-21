import React from 'react'
import filter from 'lodash/filter'
import keys from 'lodash/keys'
import PropTypes from 'prop-types'

import Speaker from 'screens/components/speaker'
import TotalRatings from 'screens/organizer/components/totalRatings'

import './proposalInfo.css'

const getNumberOfVotes = ratings => keys(filter(ratings, v => v)).length

const ProposalInfo = ({ proposal }) => {
  const {
    speakers = {}, rating, loves, hates, noopinion, usersRatings = {},
  } = proposal
  return (
    <div className="proposal-item-info">
      {Object.keys(speakers).map(id => (
        <Speaker key={id} id={id} className="proposal-item-info-speaker" small />
      ))}
      <TotalRatings
        rating={rating}
        loves={loves}
        hates={hates}
        noopinion={noopinion}
        nbvotes={getNumberOfVotes(usersRatings)}
      />
    </div>
  )
}

ProposalInfo.propTypes = {
  proposal: PropTypes.objectOf(PropTypes.any),
}

ProposalInfo.defaultProps = {
  proposal: {},
}

export default ProposalInfo
