import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import { displayRating } from 'helpers/number'
import { Drawer } from 'components/portals'
import Button from 'components/button'
import IconLabel from 'components/iconLabel/iconLabel'
import UserAvatar from 'screens/components/userAvatar'
import TotalRatings from 'screens/organizer/components/totalRatings'

import './teamRatings.css'

const TeamRatings = ({
  total, loves, hates, noopinion, ratings,
}) => (
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
      <TotalRatings
        rating={total}
        loves={loves}
        hates={hates}
        noopinion={noopinion}
        nbvotes={ratings.length}
      />
    </div>
    {ratings.map(({ uid, feeling, rating }) => (
      <div key={uid} className="team-ratings">
        <UserAvatar id={uid} />
        <div className="team-ratings-rates">
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
  </Drawer>
)

TeamRatings.propTypes = {
  total: PropTypes.number,
  loves: PropTypes.number,
  hates: PropTypes.number,
  noopinion: PropTypes.number,
  ratings: PropTypes.arrayOf(PropTypes.object),
}

TeamRatings.defaultProps = {
  total: 0,
  loves: 0,
  hates: 0,
  noopinion: 0,
  ratings: [],
}

export default TeamRatings
