import React from 'react'
import { Link } from 'redux-little-router'

import './noTalks.css'

const NoTalks = () => (
  <div className="no-talks">
    <span>No talk yet! </span>
    <Link href="/speaker/talk/create">You should create your first talk</Link>
  </div>
)

export default NoTalks
