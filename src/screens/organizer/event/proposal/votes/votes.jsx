import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import IconLabel from 'components/iconLabel'
import Rating from 'components/rating'

const Votes = ({
  rating, onRate, hasNext, hasPrevious, onNext, onPrevious, className,
}) => (
  <div className={cn(className, 'card')}>
    <div>
      <button className="btn btn-link" disabled={!hasPrevious} onClick={onPrevious}>
        <IconLabel icon="fa fa-angle-left" label="Previous" />
      </button>
    </div>
    <Rating onRate={onRate} rating={rating} />
    <div>
      <button className="btn btn-link" disabled={!hasNext} onClick={onNext}>
        <IconLabel icon="fa fa-angle-right" label="Next" right />
      </button>
    </div>
  </div>
)

Votes.propTypes = {
  rating: PropTypes.number,
  onRate: PropTypes.func.isRequired,
  hasNext: PropTypes.bool,
  hasPrevious: PropTypes.bool,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  className: PropTypes.string,
}

Votes.defaultProps = {
  rating: undefined,
  hasNext: false,
  hasPrevious: false,
  className: undefined,
}

export default Votes
