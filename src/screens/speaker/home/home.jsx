import React, { Fragment } from 'react'
import forRoute from 'hoc-little-router'
import { Link } from 'redux-little-router'

const Home = () => (
  <Fragment>
    <Link href="/speaker/talk/create" className="btn btn-link">
      Create talk
    </Link>
  </Fragment>
)

export default forRoute('HOME_SPEAKER', { absolute: true })(Home)
