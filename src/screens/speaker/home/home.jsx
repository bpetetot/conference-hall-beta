import React from 'react'
import forRoute from 'hoc-little-router'
import { Link } from 'redux-little-router'

const Home = () => (
  <div>
    <Link href="/speaker/talk/create" className="btn btn-link">
      Create talk
    </Link>
  </div>
)

export default forRoute('HOME_SPEAKER', { absolute: true })(Home)
