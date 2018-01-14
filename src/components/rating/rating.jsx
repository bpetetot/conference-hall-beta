import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import isNil from 'lodash/isNil'

import './rating.css'

class Rating extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rate: this.props.rate, // can be 0 (hate), 1 to 5 (rate), 6 (love)
      validatedRate: this.props.rate,
    }
  }

  handleMouseLeaveRating = () => {
    if (isNil(this.state.validatedRate)) {
      this.setState(state => ({ ...state, rate: undefined }))
    } else {
      this.setState(state => ({ ...state, rate: state.validatedRate }))
    }
  }

  handleClick = () => {
    this.setState(
      state => ({ ...state, validatedRate: state.rate }),
      () => {
        this.props.onRate(this.state.validatedRate)
      },
    )
  }

  handleMouseEnterStar = index => () => {
    this.setState(() => ({ rate: index }))
  }

  render() {
    const { rate, validatedRate } = this.state
    const { className } = this.props
    return (
      <div className={cn('rating', className)} onMouseLeave={this.handleMouseLeaveRating}>
        <small
          className={cn('rating-label', { 'rate-hate': rate === 0 })}
          onMouseEnter={this.handleMouseEnterStar(0)}
          onClick={this.handleClick}
          role="button"
        >
          No way !
        </small>
        <i
          className={cn('fa fa-2x', {
            'fa-circle-thin': isNil(rate),
            'fa-circle rate-hate': rate === 0,
            'fa-circle rate-hate-disable': rate > 0,
            bounce: validatedRate === 0,
          })}
          onMouseEnter={this.handleMouseEnterStar(0)}
          onClick={this.handleClick}
          role="button"
        />
        <i
          className={cn('fa fa-2x', {
            'fa-star-o': isNil(rate) || rate <= 0,
            'fa-star rate-star': rate >= 1,
            bounce: validatedRate === 1,
          })}
          onMouseEnter={this.handleMouseEnterStar(1)}
          onClick={this.handleClick}
          role="button"
        />
        <i
          className={cn('fa fa-2x', {
            'fa-star-o': isNil(rate) || rate <= 1,
            'fa-star rate-star': rate >= 2,
            bounce: validatedRate === 2,
          })}
          onMouseEnter={this.handleMouseEnterStar(2)}
          onClick={this.handleClick}
          role="button"
        />
        <i
          className={cn('fa fa-2x', {
            'fa-star-o': isNil(rate) || rate <= 2,
            'fa-star rate-star': rate >= 3,
            bounce: validatedRate === 3,
          })}
          onMouseEnter={this.handleMouseEnterStar(3)}
          onClick={this.handleClick}
          role="button"
        />
        <i
          className={cn('fa fa-2x', {
            'fa-star-o': isNil(rate) || rate <= 3,
            'fa-star rate-star': rate >= 4,
            bounce: validatedRate === 4,
          })}
          onMouseEnter={this.handleMouseEnterStar(4)}
          onClick={this.handleClick}
          role="button"
        />
        <i
          className={cn('fa fa-2x', {
            'fa-star-o': isNil(rate) || rate <= 4,
            'fa-star rate-star': rate >= 5,
            bounce: validatedRate === 5,
          })}
          onMouseEnter={this.handleMouseEnterStar(5)}
          onClick={this.handleClick}
          role="button"
        />
        <i
          className={cn('fa fa-2x', {
            'fa-heart-o': isNil(rate) || rate <= 5,
            'fa-heart rate-love': rate >= 6,
            bounce: validatedRate === 6,
          })}
          onMouseEnter={this.handleMouseEnterStar(6)}
          onClick={this.handleClick}
          role="button"
        />
        <small
          className={cn('rating-label', { 'rate-love': rate >= 6 })}
          onMouseEnter={this.handleMouseEnterStar(6)}
          onClick={this.handleClick}
          role="button"
        >
          I love it !
        </small>
      </div>
    )
  }
}

Rating.propTypes = {
  rate: PropTypes.number,
  onRate: PropTypes.func.isRequired,
  className: PropTypes.string,
}

Rating.defaultProps = {
  rate: undefined,
  className: undefined,
}

export default Rating
