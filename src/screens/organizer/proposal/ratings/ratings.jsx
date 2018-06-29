import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import IconLabel from 'components/iconLabel'
import Button from 'components/button'
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
    <Button tertiary className="btn-previous" disabled={!hasPrevious} onClick={onPrevious}>
      <IconLabel icon="fa fa-angle-left" label="Previous" />
    </Button>
    <div className="btn-ratings">
      {!isLoaded && <LoadingIndicator />}
      {isLoaded && <Rating onRating={onRating} rating={rating} feeling={feeling} />}
    </div>
    <Button tertiary className="btn-next" disabled={!hasNext} onClick={onNext}>
      <IconLabel icon="fa fa-angle-right" label="Next" right />
    </Button>
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
