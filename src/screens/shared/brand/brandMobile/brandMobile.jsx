import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { Link } from 'redux-little-router'

import './brandMobile.css'

const Brand = ({
  title, opened, className, app, goBack,
}) => (
  <div className={cn('brand', className)}>
    {opened ? (
      <a onClick={goBack} role="button" className="burger-link">
        <i className="fa fa-arrow-left" />
      </a>
    ) : (
      <Link href={`/${app}/menu`} className="burger-link">
        <i className="fa fa-bars" />
      </Link>
    )}
    <span>{title}</span>
  </div>
)

Brand.propTypes = {
  title: PropTypes.string.isRequired,
  opened: PropTypes.bool.isRequired,
  goBack: PropTypes.func.isRequired,
  app: PropTypes.string.isRequired,
  className: PropTypes.string,
}

Brand.defaultProps = {
  className: undefined,
}

export default Brand
