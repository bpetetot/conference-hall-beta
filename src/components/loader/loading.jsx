import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import './loading.css'

function LoadingIndicator({ className }) {
  return (
    <div className={cn('spinner', className)}>
      <div className="bounce1" />
      <div className="bounce2" />
      <div className="bounce3" />
    </div>
  )
}

LoadingIndicator.propTypes = {
  className: PropTypes.string,
}

LoadingIndicator.defaultProps = {
  className: undefined,
}

export default LoadingIndicator
