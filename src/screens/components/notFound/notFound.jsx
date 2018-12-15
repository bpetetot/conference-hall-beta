import React from 'react'

import { forRoute, Link } from '@k-redux-router/react-k-ramel'

import './notFound.css'

const PageNotFound = () => (
  <div className="page-not-found">
    <h1>Page not found</h1>
    <Link code="HOME">back to Conference Hall</Link>
  </div>
)

export default forRoute.notFound()(PageNotFound)
