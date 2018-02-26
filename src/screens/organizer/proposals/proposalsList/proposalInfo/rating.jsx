import React from 'react'
import isNil from 'lodash/isNil'

import IconLabel from 'components/iconLabel'
import './rating.css'

const displayRating = (rating) => {
  if (isNil(rating)) return '-'
  if (rating.toString().indexOf('.') !== -1) {
    return rating.toFixed(1)
  }
  return rating
}

const Rating = ({ rating, loves, hates }) => (
  <div className="rating-display">
    <div className="rating-display-feelings">
      <IconLabel icon="fa fa-circle" label={hates} right className="hates" />
      <IconLabel icon="fa fa-heart" label={loves} right className="loves" />
    </div>
    <div className="rating-display-rate">{displayRating(rating)}</div>
  </div>
)

export default Rating
