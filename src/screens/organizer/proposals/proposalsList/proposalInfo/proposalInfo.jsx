import React from 'react'
import filter from 'lodash/filter'
import keys from 'lodash/keys'
import PropTypes from 'prop-types'

import Speaker from 'screens/components/speaker'

import './proposalInfo.css'
import Rating from './rating'

const ProposalInfo = ({ proposal }) => {
  const {
    speakers = {}, rating, loves, hates, usersRatings = {},
  } = proposal
  return (
    <div className="proposal-item-info">
      {Object.keys(speakers).map(id => (
        <Speaker key={id} id={id} className="proposal-item-info-speaker" small />
      ))}
      <Rating
        rating={rating}
        loves={loves}
        hates={hates}
        nbvotes={keys(filter(usersRatings, v => v)).length}
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
