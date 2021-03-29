import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import isNil from 'lodash/isNil'
import { Tooltip } from '../tooltip'

import './rating.css'

const STARS = [1, 2, 3, 4, 5]

const Rating = ({ proposalId, defaultRating, defaultFeeling, onRating, className }) => {
  const [rating, setRating] = useState(defaultRating)
  const [feeling, setFeeling] = useState(defaultFeeling)

  useEffect(() => {
    setRating(defaultRating)
    setFeeling(defaultFeeling)
  }, [defaultRating, defaultFeeling, proposalId])

  const handleClick = (newRating, newFeeling) => () => {
    if (rating === newRating && feeling === newFeeling) {
      setRating(null)
      setFeeling(null)
      onRating({ rating: null, feeling: null })
    } else {
      setRating(newRating)
      setFeeling(newFeeling)
      onRating({ rating: newRating, feeling: newFeeling })
    }
  }

  return (
    <div className={cn('rating', className)}>
      <Tooltip tooltip="Without opinion" placement="left">
        <i
          className={cn('fa fa-2x', {
            'fa-ban': isNil(rating),
            'fa-ban rating-noopinion': feeling === 'NO_OPINION',
            'fa-ban rating-noopinion-disable': feeling !== 'NO_OPINION',
          })}
          onClick={handleClick(null, 'NO_OPINION')}
          aria-label="Without opinion vote"
          role="button"
        />
      </Tooltip>
      <Tooltip tooltip="No way! (0)" placement="top">
        <i
          className={cn('fa fa-2x', {
            'fa-circle-thin': isNil(rating) || rating < 0,
            'fa-circle rating-hate': feeling === 'HATE',
            'fa-circle rating-hate-disable': rating > 0,
          })}
          onClick={handleClick(0, 'HATE')}
          aria-label="No way vote"
          role="button"
        />
      </Tooltip>
      {STARS.map((i) => (
        <i
          key={i}
          className={cn('fa fa-2x', {
            'fa-star-o': isNil(rating) || rating <= i - 1,
            'fa-star rating-star': rating >= i,
          })}
          onClick={handleClick(i, 'NEUTRAL')}
          aria-label={`${i} star vote`}
          role="button"
        />
      ))}
      <Tooltip tooltip="I love it! (5)" placement="right">
        <i
          className={cn('fa fa-2x', {
            'fa-heart-o': isNil(rating) || feeling !== 'LOVE',
            'fa-heart rating-love': feeling === 'LOVE',
          })}
          onClick={handleClick(5, 'LOVE')}
          aria-label="I love it vote"
          role="button"
        />
      </Tooltip>
    </div>
  )
}

Rating.propTypes = {
  proposalId: PropTypes.number.isRequired,
  defaultRating: PropTypes.number,
  defaultFeeling: PropTypes.string,
  onRating: PropTypes.func.isRequired,
  className: PropTypes.string,
}

Rating.defaultProps = {
  defaultRating: undefined,
  defaultFeeling: undefined,
  className: undefined,
}

export default Rating
