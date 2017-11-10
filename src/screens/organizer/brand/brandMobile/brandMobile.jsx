import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { Link } from 'redux-little-router'

import './brandMobile.css'

const Brand = ({
  title, className, opened, goBack,
}) => (
  <div className={cn('brand', className)}>
    {opened ? (
      <a onClick={goBack} role="button" className="burger-link">
        <i className="fa fa-arrow-left" />
      </a>
    ) : (
      <Link href="/organizer/menu" className="burger-link">
        <i className="fa fa-bars" />
      </Link>
    )}
    <span>{title}</span>
  </div>
)

Brand.propTypes = {
  title: PropTypes.string.isRequired,
  goBack: PropTypes.func.isRequired,
  opened: PropTypes.bool,
  className: PropTypes.string,
}

Brand.defaultProps = {
  opened: false,
  className: undefined,
}

export default Brand
