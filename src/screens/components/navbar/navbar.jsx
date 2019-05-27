import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { Link } from '@k-redux-router/react-k-ramel'
import { withSizes } from 'styles/utils'

import AvatarDropdown from 'layout/avatarDropdown'
import SearchEventInput from 'screens/components/searchEvent'

import styles from './navbar.module.css'

const Navbar = ({
  fixed, transparent, withSearchInput, isMobile,
}) => (
  <div className={cn(styles.navbar, { [styles.transparent]: transparent, [styles.fixed]: fixed })}>
    <div className={styles.brand}>
      <Link code="home">
        <span className={styles.title}>
          Conference <span className={styles.accent}>Hall</span>
        </span>
      </Link>
      {withSearchInput && !isMobile && (
        <div className={styles.search}>
          <SearchEventInput />
        </div>
      )}
    </div>
    <nav className={styles.navigation}>
      <ul>
        {!isMobile && (
          <Fragment>
            <li>
              <Link code="speaker">SPEAKER</Link>
            </li>
            <li>
              <Link code="organizer">ORGANIZER</Link>
            </li>
            <li>
              <a href="#features">FEATURES</a>
            </li>
          </Fragment>
        )}
        <li>
          <AvatarDropdown />
        </li>
      </ul>
    </nav>
  </div>
)

Navbar.propTypes = {
  fixed: PropTypes.bool,
  transparent: PropTypes.bool,
  withSearchInput: PropTypes.bool,
  isMobile: PropTypes.bool,
}

Navbar.defaultProps = {
  fixed: false,
  transparent: false,
  isMobile: false,
  withSearchInput: false,
}

export default withSizes(React.memo(Navbar))
