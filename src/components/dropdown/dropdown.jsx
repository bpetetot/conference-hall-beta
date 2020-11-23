import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import './dropdown.css'

class Dropdown extends Component {
  state = {
    visible: false,
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside)
    document.addEventListener('keyup', this.handleKeyEscape)
  }

  componentWillUnmount() {
    document.addEventListener('mousedown', this.handleClickOutside)
    document.removeEventListener('keyup', this.handleKeyEscape)
  }

  handleClick = () => {
    this.setState((state) => ({ visible: !state.visible }))
  }

  handleKey = (e) => {
    if (e.key !== 'Enter') return
    this.setState((state) => ({ visible: !state.visible }))
  }

  handleClickOutside = (e) => {
    if (this.dropdownRef && !this.dropdownRef.contains(e.target)) {
      this.setState(() => ({ visible: false }))
    }
  }

  handleKeyEscape = (e) => {
    if (e.key === 'Escape' && this.state.visible) {
      this.setState(() => ({ visible: false }))
    }
  }

  render() {
    const { action, children, darkMode, className, menuClassName } = this.props
    return (
      <div
        role="button"
        ref={(e) => {
          this.dropdownRef = e
        }}
        tabIndex="0"
        className={cn('dropdown', className, { dark: darkMode })}
        onKeyPress={this.handleKey}
        onClick={this.handleClick}
      >
        {action}
        {this.state.visible && <div className={cn('dropdown-menu', menuClassName)}>{children}</div>}
      </div>
    )
  }
}

Dropdown.propTypes = {
  action: PropTypes.node.isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
  darkMode: PropTypes.bool,
  className: PropTypes.string,
  menuClassName: PropTypes.string,
}

Dropdown.defaultProps = {
  darkMode: false,
  className: undefined,
  menuClassName: undefined,
}

export default Dropdown
