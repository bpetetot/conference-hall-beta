import React from 'react'
import { Link } from '@k-redux-router/react-k-ramel'

const NoTalks = () => (
  <>
    <span>No talk yet! </span>
    <Link code="speaker-talk-create">You should create your first talk</Link>
  </>
)

export default NoTalks
