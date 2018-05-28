import React from 'react'
import filter from 'lodash/filter'
import keys from 'lodash/keys'
import PropTypes from 'prop-types'

import TotalRatings from 'screens/organizer/components/totalRatings'

import './proposalInfo.css'

const getNumberOfVotes = ratings => keys(filter(ratings, v => v)).length

const ProposalInfo = ({ proposal }) => {
  const {
    rating, loves, hates, noopinion, usersRatings = {},
  } = proposal
  return (
    <div className="proposal-item-info">
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
