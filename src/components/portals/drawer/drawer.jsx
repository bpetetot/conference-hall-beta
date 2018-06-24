import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Portal from 'components/portals/portal'
import OpenTrigger from 'components/portals/openTrigger'
import Backdrop from 'components/portals/backdrop'

import './drawer.css'

const Drawer = ({
  title, subtitle, className, actions, content, open, renderTrigger,
}) => (
  <OpenTrigger open={open} renderTrigger={renderTrigger}>
    {({ hide }) => (
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
          <div className="drawer-content">{content}</div>
          {actions && <div className="drawer-actions">{actions}</div>}
        </div>
      </Portal>
    )}
  </OpenTrigger>
)

Drawer.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  content: PropTypes.node.isRequired,
  actions: PropTypes.node,
  className: PropTypes.string,
  open: PropTypes.bool,
  renderTrigger: PropTypes.func.isRequired,
}

Drawer.defaultProps = {
  subtitle: undefined,
  actions: undefined,
  className: undefined,
  open: false,
}

export default Drawer
