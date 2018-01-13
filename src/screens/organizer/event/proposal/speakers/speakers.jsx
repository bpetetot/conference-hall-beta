import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

const Speakers = ({ className }) => <div className={cn(className, 'card')}>speakers</div>

Speakers.propTypes = {
  className: PropTypes.string,
}

Speakers.defaultProps = {
  className: undefined,
}

export default Speakers
