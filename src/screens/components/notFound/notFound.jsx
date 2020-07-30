import React, { memo } from 'react'
import { compose } from 'redux'

import { forRoute, Link } from '@k-redux-router/react-k-ramel'

import './notFound.css'

const PageNotFound = () => (
  <div className="page-not-found">
    <h1>Page not found</h1>
    <Link code="home">back to Conference Hall</Link>
  </div>
)

export default compose(memo, forRoute.notFound())(PageNotFound)
