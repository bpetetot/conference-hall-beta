import React from 'react'

import styles from './hero.module.css'

const Hero = () => (
  <header className={styles.header}>
    <div className={styles.search}>
      <h1>
          Find events and meetups all around the world to submit your talks, quickies or
          workshops.
      </h1>
      <input type="search" placeholder="Search an event to submit..." />
    </div>
  </header>
)

export default React.memo(Hero)
