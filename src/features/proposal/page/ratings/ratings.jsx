import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { useLocation, useNavigate } from 'react-router-dom'

import ProposalStars from 'features/ratings/proposal-stars'
import IconLabel from 'components/iconLabel'
import Button from 'components/button'
import './ratings.css'

const Ratings = ({ eventId, proposalId, nextProposalId, prevProposalId, className }) => {
  const navigate = useNavigate()
  const { search } = useLocation()

  const handleNext = useCallback(() => {
    if (nextProposalId === undefined) return
    const params = new URLSearchParams(search)
    navigate(`/organizer/event/${eventId}/proposals/${nextProposalId}?${params.toString()}`)
  }, [navigate, eventId, nextProposalId, search])

  const handlePrevious = useCallback(() => {
    if (prevProposalId === undefined) return
    const params = new URLSearchParams(search)
    navigate(`/organizer/event/${eventId}/proposals/${prevProposalId}?${params.toString()}`)
  }, [navigate, eventId, prevProposalId, search])

  return (
    <div className={cn(className, 'proposal-ratings-layout card')}>
      <Button
        tertiary
        className="btn-previous"
        disabled={prevProposalId === undefined}
        onClick={handlePrevious}
      >
        <IconLabel icon="fa fa-angle-left" label="Previous" />
      </Button>
      <div className="btn-ratings">
        <ProposalStars eventId={eventId} proposalId={proposalId} />
      </div>
      <Button
        tertiary
        className="btn-next"
        disabled={nextProposalId === undefined}
        onClick={handleNext}
      >
        <IconLabel icon="fa fa-angle-right" label="Next" right />
      </Button>
    </div>
  )
}

Ratings.propTypes = {
  eventId: PropTypes.string.isRequired,
  proposalId: PropTypes.string.isRequired,
  nextProposalId: PropTypes.string,
  prevProposalId: PropTypes.string,
  className: PropTypes.string,
}

Ratings.defaultProps = {
  nextProposalId: undefined,
  prevProposalId: undefined,
  className: undefined,
}

export default Ratings
