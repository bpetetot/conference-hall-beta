import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import isNil from 'lodash/isNil'
import { Tooltip } from '../tooltip'

import './rating.css'

const DEFAULT_FEELING = 'NEUTRAL'
class Rating extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rating: this.props.rating,
      feeling: this.props.feeling,
      validatedRating: this.props.rating,
      validatedFeeling: this.props.feeling,
    }
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps({ rating, feeling }) {
    if (this.props.rating !== rating || this.props.feeling !== feeling) {
      this.setState(() => ({
        rating,
        validatedRating: rating,
        feeling,
        validatedFeeling: feeling,
      }))
    }
  }

  handleMouseLeaveRating = () => {
    if (isNil(this.state.validatedFeeling)) {
      this.setState((state) => ({ ...state, rating: undefined, feeling: DEFAULT_FEELING }))
    } else {
      this.setState((state) => ({
        ...state,
        rating: state.validatedRating,
        feeling: state.validatedFeeling,
      }))
    }
  }

  handleClick = () => {
    const { rating, validatedRating, feeling, validatedFeeling } = this.state
    let newRating = rating
    let newFeeling = feeling
    if (rating === validatedRating && feeling === validatedFeeling) {
      newRating = null
      newFeeling = null
    }
    this.setState({ validatedRating: newRating, validatedFeeling: newFeeling }, () => {
      this.props.onRating({
        rating: this.state.validatedRating,
        feeling: this.state.validatedFeeling,
      })
    })
  }

  handleMouseEnterStar = (rating, feeling = DEFAULT_FEELING) => () => {
    this.setState(() => ({ rating, feeling }))
  }

  render() {
    const { stars, className } = this.props
    const { rating, feeling, validatedRating, validatedFeeling } = this.state

    const starsArray = Array.from(Array(stars), (_, i) => i + 1)
    return (
      <div className={cn('rating', className)} onMouseLeave={this.handleMouseLeaveRating}>
        <Tooltip tooltip="Without opinion" placement="left">
          <i
            className={cn('fa fa-2x', {
              'fa-ban': isNil(rating),
              'fa-ban rating-noopinion': feeling === 'NO_OPINION',
              'fa-ban rating-noopinion-disable': feeling !== 'NO_OPINION',
              bounce: validatedFeeling === 'NO_OPINION',
            })}
            onMouseEnter={this.handleMouseEnterStar(null, 'NO_OPINION')}
            onClick={this.handleClick}
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
              bounce: validatedRating === 0,
            })}
            onMouseEnter={this.handleMouseEnterStar(0, 'HATE')}
            onClick={this.handleClick}
            aria-label="No way vote"
            role="button"
          />
        </Tooltip>
        {starsArray.map((i) => (
          <i
            key={i}
            className={cn('fa fa-2x', {
              'fa-star-o': isNil(rating) || rating <= i - 1,
              'fa-star rating-star': rating >= i,
              bounce: validatedRating === i && validatedFeeling === DEFAULT_FEELING,
            })}
            onMouseEnter={this.handleMouseEnterStar(i)}
            onClick={this.handleClick}
            aria-label={`${i} star vote`}
            role="button"
          />
        ))}
        <Tooltip tooltip="I love it! (5)" placement="right">
          <i
            className={cn('fa fa-2x', {
              'fa-heart-o': isNil(rating) || feeling !== 'LOVE',
              'fa-heart rating-love': feeling === 'LOVE',
              bounce: validatedFeeling === 'LOVE',
            })}
            onMouseEnter={this.handleMouseEnterStar(5, 'LOVE')}
            onClick={this.handleClick}
            aria-label="I love it vote"
            role="button"
          />
        </Tooltip>
      </div>
    )
  }
}

Rating.propTypes = {
  stars: PropTypes.number,
  rating: PropTypes.number,
  feeling: PropTypes.string,
  onRating: PropTypes.func.isRequired,
  className: PropTypes.string,
}

Rating.defaultProps = {
  stars: 5,
  rating: undefined,
  feeling: undefined,
  className: undefined,
}

export default Rating
