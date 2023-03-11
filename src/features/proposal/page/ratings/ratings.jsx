import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { useLocation, useNavigate } from 'react-router-dom'

import IconLabel from 'components/iconLabel'
import Button from 'components/button'
import { LoadingIndicator } from 'components/loader'
import Rating from 'components/rating'
import './ratings.css'

function Ratings({
  eventId,
  isLoaded,
  loadRatings,
  rating,
  feeling,
  onRating,
  nextProposalId,
  prevProposalId,
  className,
}) {
  const navigate = useNavigate()
  const { search } = useLocation()

  const handleNext = useCallback(() => {
    if (nextProposalId === undefined) return
    loadRatings(eventId, nextProposalId)
    const params = new URLSearchParams(search)
    navigate(`/organizer/event/${eventId}/proposals/${nextProposalId}?${params.toString()}`)
  }, [navigate, eventId, nextProposalId, search, loadRatings])

  const handlePrevious = useCallback(() => {
    if (prevProposalId === undefined) return
    loadRatings(eventId, prevProposalId)
    const params = new URLSearchParams(search)
    navigate(`/organizer/event/${eventId}/proposals/${prevProposalId}?${params.toString()}`)
  }, [navigate, eventId, prevProposalId, search, loadRatings])

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
        {!isLoaded && <LoadingIndicator />}
        {isLoaded && <Rating onRating={onRating} rating={rating} feeling={feeling} />}
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
  isLoaded: PropTypes.bool,
  rating: PropTypes.number,
  feeling: PropTypes.string,
  onRating: PropTypes.func.isRequired,
  loadRatings: PropTypes.func.isRequired,
  nextProposalId: PropTypes.string,
  prevProposalId: PropTypes.string,
  className: PropTypes.string,
}

Ratings.defaultProps = {
  isLoaded: false,
  rating: undefined,
  feeling: undefined,
  nextProposalId: undefined,
  prevProposalId: undefined,
  className: undefined,
}

export default Ratings
