import React from 'react'

import { Link } from '@k-redux-router/react-k-ramel'
import Brand from 'layout/brand'
import AvatarDropdown from 'layout/avatarDropdown'

import styles from './navbar.module.css'

const Navbar = () => (
  <div className={styles.navbar}>
    <Brand className={styles.brand} />
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

export default Navbar
