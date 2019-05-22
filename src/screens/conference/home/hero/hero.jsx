import React from 'react'

import SearchEventInput from 'screens/components/searchEvent'
import styles from './hero.module.css'

const Hero = () => (
  <header className={styles.header}>
    <div className={styles.hero}>
      <h1>
        Find events and meetups all around the world to submit your talks, quickies or workshops.
      </h1>
      <SearchEventInput />
    </div>
  </header>
)

export default React.memo(Hero)
