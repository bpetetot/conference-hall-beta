import React from 'react'
import PropTypes from 'prop-types'

import { displayRating } from 'helpers/number'
import IconLabel from 'components/iconLabel'
import './rating.css'

const Rating = ({ stats }) => (
  <div className="rating-display">
    <div className="rating-display-rate">{displayRating(stats.average)}</div>
    <div className="rating-display-feelings">
      <IconLabel icon="fa fa-ban" label={stats.noopinion} right className="noopinion" />
      <IconLabel icon="fa fa-circle" label={stats.negatives} right className="negatives" />
      <IconLabel icon="fa fa-heart" label={stats.positives} right className="positives" />
      <IconLabel icon="fa fa-users" label={stats.count} right className="votes" />
    </div>
  </div>
)

Rating.propTypes = {
  stats: PropTypes.object,
}

Rating.defaultProps = {
  stats: {},
}

export default Rating
