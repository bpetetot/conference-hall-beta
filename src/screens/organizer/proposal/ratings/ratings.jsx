import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import IconLabel from 'components/iconLabel'
import { LoadingIndicator } from 'components/loader'
import Rating from 'components/rating'
import './ratings.css'

const Ratings = ({
  isLoaded,
  rating,
  feeling,
  onRating,
  hasNext,
  hasPrevious,
  onNext,
  onPrevious,
  className,
}) => (
  <div className={cn(className, 'proposal-ratings-layout card')}>
    <button className="btn btn-link btn-previous" disabled={!hasPrevious} onClick={onPrevious}>
      <IconLabel icon="fa fa-angle-left" label="Previous" />
    </button>
    <div className="btn-ratings">
      {!isLoaded && <LoadingIndicator />}
      {isLoaded && <Rating onRating={onRating} rating={rating} feeling={feeling} />}
    </div>
    <button className="btn btn-link btn-next" disabled={!hasNext} onClick={onNext}>
      <IconLabel icon="fa fa-angle-right" label="Next" right />
    </button>
  </div>
)

Ratings.propTypes = {
  isLoaded: PropTypes.bool,
  rating: PropTypes.number,
  feeling: PropTypes.string,
  onRating: PropTypes.func.isRequired,
  hasNext: PropTypes.bool,
  hasPrevious: PropTypes.bool,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  className: PropTypes.string,
}

Ratings.defaultProps = {
  isLoaded: false,
  rating: undefined,
  feeling: undefined,
  hasNext: false,
  hasPrevious: false,
  className: undefined,
}

export default Ratings
