import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import { LoadingIndicator } from 'components/loader'
import Rating from 'components/rating'
import './ratings.css'

const Ratings = ({
  isLoaded,
  rating,
  feeling,
  onRating,
  className,
}) => (
  <div className={cn(className, 'proposal-ratings-layout card')}>
    {!isLoaded && <LoadingIndicator />}
    {isLoaded && <Rating onRating={onRating} rating={rating} feeling={feeling} />}
  </div>
)

Ratings.propTypes = {
  isLoaded: PropTypes.bool,
  rating: PropTypes.number,
  feeling: PropTypes.string,
  onRating: PropTypes.func.isRequired,
  className: PropTypes.string,
}

Ratings.defaultProps = {
  isLoaded: false,
  rating: undefined,
  feeling: undefined,
  className: undefined,
}

export default Ratings
