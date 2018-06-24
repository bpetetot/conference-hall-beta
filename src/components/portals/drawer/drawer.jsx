import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Portal from 'components/portals/portal'
import OpenTrigger from 'components/portals/openTrigger'
import Backdrop from 'components/portals/backdrop'

import './drawer.css'

const Drawer = ({
  title, subtitle, className, actions, children, open, renderTrigger,
}) => (
  <OpenTrigger defaultOpen={open} renderTrigger={renderTrigger}>
    {({ hide, show, isOpen }) => (
      <Portal>
        <Backdrop onClick={hide} />
        <div className={cn('drawer-sidebar', className)}>
          <div className="drawer-header">
            <div className="drawer-titles">
              <div className="drawer-title">{title}</div>
              {subtitle && <div className="drawer-subtitle">{subtitle}</div>}
            </div>
            <button className="drawer-icon" onClick={hide}>
              <i className="fa fa-times" />
            </button>
          </div>
          <div className="drawer-content">{children}</div>
          {actions && <div className="drawer-actions">{actions({ hide, show, isOpen })}</div>}
        </div>
      </Portal>
    )}
  </OpenTrigger>
)

Drawer.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  children: PropTypes.node.isRequired,
  actions: PropTypes.node,
  className: PropTypes.string,
  open: PropTypes.bool,
  renderTrigger: PropTypes.func,
}

Drawer.defaultProps = {
  subtitle: undefined,
  actions: undefined,
  className: undefined,
  open: false,
  renderTrigger: undefined,
}

export default Drawer
