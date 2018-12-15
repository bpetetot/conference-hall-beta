import React, { Fragment } from 'react'
import { Link } from '@k-redux-router/react-k-ramel'

const NoTalks = () => (
  <Fragment>
    <span>No talk yet! </span>
    <Link code="CREATE_TALK">You should create your first talk</Link>
  </Fragment>
)

export default NoTalks
