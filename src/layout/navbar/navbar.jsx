import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { withSizes } from 'styles/utils'

import InputSearch from 'screens/search/inputSearch'
import Link from 'components/link'

import Brand from './brand'
import Avatar from './avatar'
import styles from './navbar.module.css'

const Navbar = ({ fixed, transparent, withSearchInput, isMobile, sidebar, className }) => (
  <div
    className={cn(
      styles.navbar,
      { [styles.transparent]: transparent, [styles.fixed]: fixed },
      className,
    )}
  >
    <div className={styles.leftSide}>
      <Brand sidebar={sidebar} />
      {withSearchInput && !isMobile && (
        <div className={styles.search}>
          <InputSearch darkMode />
        </div>
      )}
    </div>
    <nav className={styles.rightSide}>
      <ul>
        {!isMobile && (
          <>
            <li>
              <Link code="search" classNameActive={styles.active} onlyRoot>
                SEARCH
              </Link>
            </li>
            <li>
              <Link code="speaker" classNameActive={styles.active} onlyRoot>
                SPEAKER
              </Link>
            </li>
            <li>
              <Link code="organizer" classNameActive={styles.active} onlyRoot>
                ORGANIZER
              </Link>
            </li>
          </>
        )}
        <li>
          <Avatar />
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
  sidebar: PropTypes.node,
  className: PropTypes.string,
}

Navbar.defaultProps = {
  fixed: false,
  transparent: false,
  isMobile: false,
  withSearchInput: false,
  sidebar: undefined,
  className: undefined,
}

export default withSizes(React.memo(Navbar))
