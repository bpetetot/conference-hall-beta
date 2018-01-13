import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

const Header = ({ className }) => <div className={cn(className, 'card')}>Header</div>

Header.propTypes = {
  className: PropTypes.string,
}

Header.defaultProps = {
  className: undefined,
}

export default Header
