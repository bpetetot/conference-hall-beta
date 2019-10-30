import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@k-redux-router/react-k-ramel'

import { withSizes } from 'styles/utils'
import Button from 'components/button'
import InputSearch from 'screens/search/inputSearch'

import styles from './hero.module.css'

const Hero = ({ isMobile }) => (
  <header className={styles.header}>
    <div className={styles.hero}>
      <h1>
        Find conferences and meetups all around the world to submit your talks, quickies or
        workshops.
      </h1>
      <InputSearch className={styles.inputSearch} />
      <div className={styles.actions}>
        <Link code="search">Explore events</Link>
      </div>
    </div>
    {isMobile && (
      <div className={styles.mobileActions} size="large">
        <Button accent size="large">
          {(className) => (
            <Link code="speaker" className={className}>
              Speaker Hall
            </Link>
          )}
        </Button>
        <Button accent size="large">
          {(className) => (
            <Link code="organizer" className={className}>
              Organizer Hall
            </Link>
          )}
        </Button>
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
