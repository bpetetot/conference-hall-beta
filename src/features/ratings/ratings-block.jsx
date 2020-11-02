import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import { displayRating } from 'helpers/number'
import IconLabel from 'components/iconLabel/iconLabel'
import { LoadingIndicator } from 'components/loader'
import UserAvatar from 'features/user/user-avatar'
import TotalRatings from 'features/ratings/totalRatings'

import './ratings-block.css'
import { useRatings } from './useRatings'

const RatingsBlock = ({ eventId, proposalId, total, loves, hates, noopinion }) => {
  const { data, isLoading } = useRatings(eventId, proposalId)

  if (isLoading) return <LoadingIndicator />

  return (
    <>
      <div className="ratings-block-total">
        <span className="ratings-block-total-label">Total</span>
        <TotalRatings
          rating={total}
          loves={loves}
          hates={hates}
          noopinion={noopinion}
          nbvotes={data.length}
        />
      </div>
      {data.map(({ uid, feeling, rating }) => (
        <div key={uid} className="ratings-block">
          <UserAvatar userId={uid} />
          <div className="ratings-block-rates">
            <IconLabel
              icon={cn('fa', {
                'fa-ban': feeling === 'noopinion',
                'fa-star': feeling === 'neutral',
                'fa-heart': feeling === 'love',
                'fa-circle': feeling === 'hate',
              })}
              label={String(displayRating(rating))}
              right
            />
          </div>
        </div>
      ))}
    </>
  )
}

RatingsBlock.propTypes = {
  eventId: PropTypes.string.isRequired,
  proposalId: PropTypes.string.isRequired,
  total: PropTypes.number,
  loves: PropTypes.number,
  hates: PropTypes.number,
  noopinion: PropTypes.number,
}

RatingsBlock.defaultProps = {
  total: 0,
  loves: 0,
  hates: 0,
  noopinion: 0,
}

export default RatingsBlock
