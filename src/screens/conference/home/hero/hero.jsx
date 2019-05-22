import React from 'react'

import './hero.css'

const Hero = () => (
  <header className="header">
    <div className="search">
      <h4>
          Find events and meetups all around the world to submit your talks, quickies and
          workshops...
      </h4>
      <input type="search" placeholder="Search an event to submit..." />
    </div>
  </header>
)

export default Hero
