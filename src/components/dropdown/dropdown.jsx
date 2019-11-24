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
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  handleClick = () => {
    this.setState(state => ({ visible: !state.visible }))
  }

  handleClickOutside = e => {
    if (this.dropdownRef && !this.dropdownRef.contains(e.target)) {
      this.setState(() => ({ visible: false }))
    }
  }

  render() {
    const { action, children, darkMode, className, menuClassName } = this.props
    return (
      <div
        role="button"
        ref={e => {
          this.dropdownRef = e
        }}
        tabIndex="0"
        className={cn('dropdown', className, { dark: darkMode })}
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
