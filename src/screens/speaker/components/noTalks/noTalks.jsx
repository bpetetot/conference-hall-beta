import React, { Fragment } from 'react'
import { Link } from 'redux-little-router'

const NoTalks = () => (
  <Fragment>
    <span>No talk yet! </span>
    <Link href="/speaker/talk/create">You should create your first talk</Link>
  </Fragment>
)

export default NoTalks
