import React from 'react'
import { Link, forRoute } from '@k-redux-router/react-k-ramel'

import './home.css'

const Home = () => (
  <div className="home">
    <Link code="HOME_SPEAKER" className="home-link">
      <i className="fa fa-microphone" />
      <span>I&apos;m a speaker</span>
    </Link>
    <Link code="HOME_ORGANIZER" className="home-link">
      <i className="fa fa-rocket" />
      <span>I&apos;m an organizer</span>
    </Link>
  </div>
)

export default forRoute.absolute('home')(Home)
