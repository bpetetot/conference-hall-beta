import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import isNil from 'lodash/isNil'

import IconLabel from 'components/iconLabel'
import Button from 'components/button'
import Rating from 'components/rating'
import { useNotification } from 'app/layout/notification/context'
import { useRateProposal } from 'data/proposal'
import './ratings.css'

const Ratings = ({ proposal, nextProposal, previousProposal, className }) => {
  const { eventId } = useParams()
  const navigate = useNavigate()
  const { search } = useLocation()
  const { sendError } = useNotification()

  const { rating, feeling } = proposal.userRating
  const { mutateAsync: rate } = useRateProposal(eventId, proposal.id)

  const handleNext = () => {
    if (isNil(nextProposal)) return
    const params = new URLSearchParams(search)
    navigate(`/organizer/event/${eventId}/proposals/${nextProposal}?${params.toString()}`)
  }

  const handlePrevious = () => {
    if (isNil(previousProposal)) return
    const params = new URLSearchParams(search)
    navigate(`/organizer/event/${eventId}/proposals/${previousProposal}?${params.toString()}`)
  }

  const handleRating = async (data) => {
    await rate(data).catch((err) => sendError(`An unexpected error has occurred: ${err.message}`))
  }

  return (
    <div className={cn(className, 'proposal-ratings-layout card')}>
      <Button
        tertiary
        className="btn-previous"
        disabled={isNil(previousProposal)}
        onClick={handlePrevious}
      >
        <IconLabel icon="fa fa-angle-left" label="Previous" />
      </Button>
      <div className="btn-ratings">
        <Rating onRating={handleRating} defaultRating={rating} defaultFeeling={feeling} />
      </div>
      <Button tertiary className="btn-next" disabled={isNil(nextProposal)} onClick={handleNext}>
        <IconLabel icon="fa fa-angle-right" label="Next" right />
      </Button>
    </div>
  )
}

Ratings.propTypes = {
  proposal: PropTypes.object.isRequired,
  nextProposal: PropTypes.number,
  previousProposal: PropTypes.number,
  className: PropTypes.string,
}

Ratings.defaultProps = {
  nextProposal: undefined,
  previousProposal: undefined,
  className: undefined,
}

export default Ratings
