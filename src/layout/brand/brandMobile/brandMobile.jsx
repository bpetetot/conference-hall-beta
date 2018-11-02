/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'redux-little-router'

import './brandMobile.css'

const Brand = ({
  title,
  opened,
  hasSidebar,
  className,
  baseRoute,
  goBack,
}) => (
  <div className={className}>
    {hasSidebar && (
      <Fragment>
        {opened ? (
          <a onClick={goBack} role="button" className="burger-link">
            <i className="fa fa-arrow-left" />
          </a>
        ) : (
          <Link href={`${baseRoute}/menu`} className="burger-link">
            <i className="fa fa-bars" />
          </Link>
        )}
      </Fragment>
    )}
    <span>{title}</span>
  </div>
)

Brand.propTypes = {
  title: PropTypes.string.isRequired,
  opened: PropTypes.bool.isRequired,
  hasSidebar: PropTypes.bool.isRequired,
  goBack: PropTypes.func.isRequired,
  baseRoute: PropTypes.string.isRequired,
  className: PropTypes.string,
}

Brand.defaultProps = {
  className: undefined,
}

export default Brand
