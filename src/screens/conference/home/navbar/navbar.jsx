import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { Link } from '@k-redux-router/react-k-ramel'

import AvatarDropdown from 'layout/avatarDropdown'
import SearchEventInput from 'screens/components/searchEvent'

import styles from './navbar.module.css'

const Navbar = ({ scrolled }) => (
  <div className={cn(styles.navbar, { [styles.scrolled]: scrolled })}>
    <div className={styles.brand}>
      <span className={styles.title}>
        Conference <span className={styles.accent}>Hall</span>
      </span>
      {scrolled && (
        <div className={styles.search}>
          <SearchEventInput />
        </div>
      )}
    </div>
    <nav className={styles.navigation}>
      <ul>
        <li>
          <Link code="organizer">SPEAKER</Link>
        </li>
        <li>
          <Link code="organizer">ORGANIZER</Link>
        </li>
        <li>
          <a href="#features">FEATURES</a>
        </li>
        <li>
          <AvatarDropdown />
        </li>
      </ul>
    </nav>
  </div>
)

Navbar.propTypes = {
  scrolled: PropTypes.bool,
}

Navbar.defaultProps = {
  scrolled: false,
}

export default React.memo(Navbar)
