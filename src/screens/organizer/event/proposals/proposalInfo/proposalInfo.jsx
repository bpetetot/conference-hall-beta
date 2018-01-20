import React from 'react'
import PropTypes from 'prop-types'
import isNil from 'lodash/isNil'

import Speaker from 'screens/components/speaker'

import './proposalInfo.css'

const displayRating = (rating) => {
  if (isNil(rating)) return '-'
  if (rating.toString().indexOf('.') !== -1) {
    return rating.toFixed(1)
  }
  return rating
}

const ProposalInfo = ({ proposal }) => {
  const { speakers = {}, rating } = proposal
  return (
    <div className="proposal-item-info">
      {Object.keys(speakers).map(id => (
        <Speaker key={id} id={id} className="proposal-item-info-speaker" small />
      ))}
      <div className="proposal-item-info-rating">{displayRating(rating)}</div>
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
