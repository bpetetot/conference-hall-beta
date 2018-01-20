import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import IconLabel from 'components/iconLabel'
import Rating from 'components/rating'

const Ratings = ({
  rating,
  feeling,
  onRating,
  hasNext,
  hasPrevious,
  onNext,
  onPrevious,
  className,
}) => (
  <div className={cn(className, 'card')}>
    <div>
      <button className="btn btn-link" disabled={!hasPrevious} onClick={onPrevious}>
        <IconLabel icon="fa fa-angle-left" label="Previous" />
      </button>
    </div>
    <Rating onRating={onRating} rating={rating} feeling={feeling} />
    <div>
      <button className="btn btn-link" disabled={!hasNext} onClick={onNext}>
        <IconLabel icon="fa fa-angle-right" label="Next" right />
      </button>
    </div>
  </div>
)

Ratings.propTypes = {
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
  rating: undefined,
  feeling: undefined,
  hasNext: false,
  hasPrevious: false,
  className: undefined,
}

export default Ratings
