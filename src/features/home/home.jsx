import React from 'react'
import { Link } from 'react-router-dom'

import './home.css'

function Home() {
  return (
    <div className="home">
      <Link to="speaker" className="home-link">
        <i className="fa fa-microphone" />
        <span>I&apos;m a speaker</span>
      </Link>
      <Link to="organizer" className="home-link">
        <i className="fa fa-rocket" />
        <span>I&apos;m an organizer</span>
      </Link>
    </div>
  )
}

export default Home
