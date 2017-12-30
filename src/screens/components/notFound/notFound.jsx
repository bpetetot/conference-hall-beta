import React from 'react'
import PropTypes from 'prop-types'

import { Link, Fragment } from 'redux-little-router'

import './notFound.css'

const PageNotFound = ({ isRouteNotFound }) => (
  <Fragment withConditions={() => isRouteNotFound}>
    <div className="page-not-found">
      <h1>Page not found</h1>
      <Link href="/">back to Conference Hall</Link>
    </div>
  </Fragment>
)

PageNotFound.propTypes = {
  isRouteNotFound: PropTypes.bool,
}

PageNotFound.defaultProps = {
  isRouteNotFound: false,
}

export default PageNotFound
