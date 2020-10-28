/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { useLocation, Link } from 'react-router-dom'

import { getAppTitle } from 'features/router/utils'
import OpenTrigger from 'components/helpers/openTrigger'
import Portal from 'components/portals/portal'
import useTheme from 'styles/themes/useTheme'
import { withSizes } from 'styles/utils'

import AvatarDropdown from '../avatarDropdown'

import styles from './brand.module.css'

const SidebarWrapper = ({ onClick, content }) => {
  const theme = useTheme()
  return (
    <Portal className={cn(theme, styles.mobileSidebarPortal)}>
      <div className={styles.mobileSidebar} onClick={onClick} role="button">
        {content}
      </div>
    </Portal>
  )
}

SidebarWrapper.propTypes = {
  onClick: PropTypes.func.isRequired,
  content: PropTypes.node.isRequired,
}

const Brand = ({ isTablet, isMobile, sidebar, className }) => {
  const { pathname } = useLocation()

  return (
    <div className={cn(styles.brand, className)}>
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
      <Link to="/">{getAppTitle(pathname)}</Link>
      {sidebar && (isMobile || isTablet) && <AvatarDropdown classname={styles.avatar} />}
    </div>
  )
}

Brand.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  isTablet: PropTypes.bool.isRequired,
  sidebar: PropTypes.node,
  className: PropTypes.string,
}

Brand.defaultProps = {
  sidebar: undefined,
  className: undefined,
}

export default withSizes(Brand)
