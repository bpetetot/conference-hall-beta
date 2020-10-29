import React from 'react'
import { Link } from 'react-router-dom'

const NoTalks = () => (
  <>
    <span>No talk yet! </span>
    <Link to="/speaker/talk/create">You should create your first talk</Link>
  </>
)

export default NoTalks
