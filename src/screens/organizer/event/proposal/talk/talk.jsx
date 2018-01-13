import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

const Talk = ({ className }) => <div className={cn(className, 'card')}>talk</div>

Talk.propTypes = {
  className: PropTypes.string,
}

Talk.defaultProps = {
  className: undefined,
}

export default Talk
