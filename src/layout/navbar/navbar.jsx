import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { Link } from '@k-redux-router/react-k-ramel'
import { withSizes } from 'styles/utils'

import InputSearch from 'screens/conference/search/inputSearch'

import Brand from './brand'
import Avatar from './avatar'
import styles from './navbar.module.css'

const Navbar = ({
  fixed, transparent, withSearchInput, isMobile, sidebar, className,
}) => (
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
          <Fragment>
            <li>
              <Link code="speaker">SPEAKER</Link>
            </li>
            <li>
              <Link code="organizer">ORGANIZER</Link>
            </li>
          </Fragment>
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
