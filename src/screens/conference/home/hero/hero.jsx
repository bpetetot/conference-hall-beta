import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@k-redux-router/react-k-ramel'
import { withSizes } from 'styles/utils'

import InputSearch from 'screens/conference/search/inputSearch'
import styles from './hero.module.css'

const Hero = ({ isMobile }) => (
  <header className={styles.header}>
    <div className={styles.hero}>
      <h1>
        Find events and meetups all around the world to submit your talks, quickies or workshops.
      </h1>
      <InputSearch />
    </div>
    {isMobile && (
      <div className={styles.actions}>
        <Link code="speaker">SPEAKER</Link>
        <Link code="organizer">ORGANIZER</Link>
      </div>
    )}
  </header>
)

Hero.propTypes = {
  isMobile: PropTypes.bool,
}

Hero.defaultProps = {
  isMobile: false,
}

export default withSizes(React.memo(Hero))
