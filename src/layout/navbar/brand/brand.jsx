/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { Link } from '@k-redux-router/react-k-ramel'

import OpenTrigger from 'components/helpers/openTrigger'
import Portal from 'components/portals/portal'
import withTheme from 'styles/themes/withTheme'
import { withSizes } from 'styles/utils'

import styles from './brand.module.css'

const SidebarWrapper = withTheme(({ className, onClick, content }) => (
  <Portal className={cn(className, styles.mobileSidebarPortal)}>
    <div className={styles.mobileSidebar} onClick={onClick} role="button">
      {content}
    </div>
  </Portal>
))

const Brand = ({ title, baseRoute, isTablet, isMobile, sidebar, className }) => (
  <div
    className={cn(
      styles.brand,
      {
        [styles.invert]:
          (baseRoute === 'speaker' || baseRoute === 'organizer') && !isMobile && !isTablet,
      },
      className,
    )}
  >
    {sidebar && (isMobile || isTablet) && (
      <OpenTrigger
        renderTrigger={({ show, hide, isOpen }) => (
          <a onClick={isOpen ? hide : show} role="button" className={styles.burgerLink}>
            <i className={`fa ${isOpen ? 'fa-arrow-left' : 'fa-bars'}`} />
          </a>
        )}
      >
        {({ hide }) => <SidebarWrapper content={sidebar} onClick={hide} />}
      </OpenTrigger>
    )}
    <Link code="home">
      {title} <span className={styles.subtitle}>Hall</span>
    </Link>
  </div>
)

Brand.propTypes = {
  title: PropTypes.string.isRequired,
  isMobile: PropTypes.bool.isRequired,
  isTablet: PropTypes.bool.isRequired,
  baseRoute: PropTypes.string.isRequired,
  sidebar: PropTypes.node,
  className: PropTypes.string,
}

Brand.defaultProps = {
  sidebar: undefined,
  className: undefined,
}

export default withSizes(Brand)
