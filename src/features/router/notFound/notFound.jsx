import React, { memo } from 'react'

import { Link } from 'react-router-dom'

import './notFound.css'

function PageNotFound() {
  return (
    <div className="page-not-found">
      <h1>Page not found</h1>
      <Link to="/">back to Conference Hall</Link>
    </div>
  )
}

export default memo(PageNotFound)
