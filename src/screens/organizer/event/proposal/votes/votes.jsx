import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

const Votes = ({ className }) => (
  <div className={cn(className, 'card')}>
    <p>votes</p>
  </div>
)

Votes.propTypes = {
  className: PropTypes.string,
}

Votes.defaultProps = {
  className: undefined,
}

export default Votes
