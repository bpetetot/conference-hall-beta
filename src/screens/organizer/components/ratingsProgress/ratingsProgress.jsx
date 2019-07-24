import React from 'react'
import PropTypes from 'prop-types'

const RatingsProgress = ({ rated, total }) => <div>{`${rated} / ${total}`}</div>

RatingsProgress.propTypes = {
  rated: PropTypes.number,
  total: PropTypes.number,
}

RatingsProgress.defaultProps = {
  rated: 0,
  total: 0,
}

export default RatingsProgress
