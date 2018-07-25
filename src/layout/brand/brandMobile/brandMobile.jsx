import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'redux-little-router'

import './brandMobile.css'

const Brand = ({
  title, opened, className, baseRoute, goBack,
}) => (
  <div className={className}>
    {opened ? (
      <a onClick={goBack} role="button" className="burger-link">
        <i className="fa fa-arrow-left" />
      </a>
    ) : (
      <Link href={`${baseRoute}/menu`} className="burger-link">
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
  baseRoute: PropTypes.string.isRequired,
  className: PropTypes.string,
}

Brand.defaultProps = {
  className: undefined,
}

export default Brand
