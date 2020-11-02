import React from 'react'
import PropTypes from 'prop-types'

import { LoadingIndicator } from 'components/loader'
import Rating from 'components/rating'
import { useRateProposal, useUserRating } from './useRatings'

const ProposalStars = ({ eventId, proposalId }) => {
  const { data, isLoading } = useUserRating(eventId, proposalId)

  const [rateProposal, { isLoading: isSubmitting }] = useRateProposal(eventId, proposalId)

  if (isLoading && !isSubmitting) return <LoadingIndicator />

  return (
    <Rating
      onRating={(...rating) => rateProposal(rating)}
      rating={data?.rating}
      feeling={data?.feeling}
    />
  )
}

ProposalStars.propTypes = {
  eventId: PropTypes.string.isRequired,
  proposalId: PropTypes.string.isRequired,
}

export default ProposalStars
