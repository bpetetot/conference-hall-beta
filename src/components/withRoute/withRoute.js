/* eslint-disable */
import React from 'react'
import { Fragment } from 'redux-little-router'

const withRoute = Component => ({ forRoute, withConditions, ...rest }) => {
  if (!forRoute) return <Component {...rest} />
  return (
    <Fragment forRoute={forRoute} withConditions={withConditions}>
      <Component {...rest} />
    </Fragment>
  )
}

export default withRoute
