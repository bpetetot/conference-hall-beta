import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import { displayRating } from 'helpers/number'
import { Drawer } from 'components/portals'
import Button from 'components/button'
import IconLabel from 'components/iconLabel/iconLabel'
import TotalRatings from 'features/ratings/totalRatings'

import './teamRatings.css'

const UserRating = ({ userRating }) => {
  const { rating, feeling } = userRating
  return (
    <div className="team-ratings">
      <div className="team-ratings-rates">
        <IconLabel
          icon={cn('fa', {
            'fa-ban': feeling === 'NO_OPINION',
            'fa-star': feeling === 'NEUTRAL',
            'fa-heart': feeling === 'LOVE',
            'fa-circle': feeling === 'HATE',
          })}
          label={String(displayRating(rating))}
          right
        />
      </div>
    </div>
  )
}

UserRating.propTypes = {
  userRating: PropTypes.object.isRequired,
}

const TeamRatings = ({ ratings, stats }) => (
  <Drawer
    title="Team ratings"
    renderTrigger={({ show }) => (
      <Button secondary onClick={show}>
        <IconLabel icon="fa fa-star" label="All ratings" />
      </Button>
    )}
  >
    <div className="team-ratings-total">
      <span className="team-ratings-total-label">Total</span>
      <TotalRatings stats={stats} />
    </div>
    {ratings.map((rating) => (
      <UserRating key={rating.userId} userRating={rating} />
    ))}
  </Drawer>
)

TeamRatings.propTypes = {
  ratings: PropTypes.array,
  stats: PropTypes.object,
}

TeamRatings.defaultProps = {
  ratings: [],
  stats: {},
}

export default TeamRatings
