/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { Link } from 'redux-little-router'

import OpenTrigger from 'components/helpers/openTrigger'
import Portal from 'components/portals/portal'
import withTheme from 'styles/themes/withTheme'
import { withSizes } from 'styles/utils'

import './brand.css'

const SidebarWrapper = withTheme(({ className, onClick, content }) => (
  <Portal className={cn(className, 'mobile-sidebar-portal')}>
    <div className="mobile-sidebar" onClick={onClick} role="button">
      {content}
    </div>
  </Portal>
))

const Brand = ({
  title, baseRoute, isMobile, sidebar, className,
}) => (
  <div className={cn('brand', className)}>
    {sidebar
      && isMobile && (
        <OpenTrigger
          renderTrigger={({ show, hide, isOpen }) => (
            <a onClick={isOpen ? hide : show} role="button" className="burger-link">
              <i className={`fa ${isOpen ? 'fa-arrow-left' : 'fa-bars'}`} />
            </a>
          )}
        >
          {({ hide }) => <SidebarWrapper content={sidebar} onClick={hide} />}
        </OpenTrigger>
    )}
    <Link href={baseRoute}>{title}</Link>
  </div>
)

Brand.propTypes = {
  title: PropTypes.string.isRequired,
  isMobile: PropTypes.bool.isRequired,
  baseRoute: PropTypes.string.isRequired,
  sidebar: PropTypes.node,
  className: PropTypes.string,
}

Brand.defaultProps = {
  sidebar: undefined,
  className: undefined,
}

export default withSizes(Brand)
