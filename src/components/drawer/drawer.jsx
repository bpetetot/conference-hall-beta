import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Portal from '../portal'

import './drawer.css'

class Drawer extends Component {
  state = { isOpen: false }

  componentWillUnmount() {
    this.close()
  }

  open = () => {
    document.removeEventListener('keydown', this.handleKeydown)
    this.setState({ isOpen: true })
  }

  close = () => {
    document.addEventListener('keydown', this.handleKeydown)
    this.setState({ isOpen: false })
  }

  handleKeydown = ({ keyCode }) => keyCode === 27 && this.close()

  render() {
    const {
      opener, title, subtitle, className, actions, content,
    } = this.props

    const { isOpen } = this.state

    return (
      <Fragment>
        {opener(this.open)}
        {isOpen && (
          <Portal>
            <div className="drawer-isMobile">
              <div className="drawer-backdrop" onClick={this.close} role="button" />
              <div className={cn('drawer-sidebar', className)}>
                <div className="drawer-header">
                  <div className="drawer-titles">
                    <div className="drawer-title">{title}</div>
                    {subtitle && <div className="drawer-subtitle">{subtitle}</div>}
                  </div>
                  <button className="drawer-icon" onClick={this.close}>
                    <i className="fa fa-times" />
                  </button>
                </div>
                <div className="drawer-content">{content}</div>
                {actions && <div className="drawer-actions">{actions}</div>}
              </div>
            </div>
          </Portal>
        )}
      </Fragment>
    )
  }
}

Drawer.propTypes = {
  opener: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  content: PropTypes.node.isRequired,
  actions: PropTypes.node,
  className: PropTypes.string,
}

Drawer.defaultProps = {
  subtitle: undefined,
  actions: undefined,
  className: undefined,
}

export default Drawer
