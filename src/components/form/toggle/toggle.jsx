import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './toggle.css'

class Toggle extends Component {
  state = {
    checked: this.props.checked,
  }

  getValue = (checked) => {
    const { truthy, falsy } = this.props
    if (checked && truthy) {
      return truthy
    }
    if (!checked && falsy) {
      return falsy
    }
    return checked
  }

  getChecked = (value) => {
    const { truthy, falsy } = this.props
    const { checked } = this.state
    if (!truthy && !falsy) {
      return checked
    }
    if (value === truthy) {
      return true
    }
    if (value === falsy) {
      return false
    }
    return value
  }

  handleChange = (e) => {
    const { checked } = e.target
    const { onChange } = this.props
    this.setState(() => ({ checked }), () => onChange(this.getValue(checked)))
  }

  render() {
    const { name, value, ...rest } = this.props
    const checked = this.getChecked(value)

    return (
      <label className="toggle" htmlFor={name}>
        <input id={name} name={name} type="checkbox" {...rest} checked={checked} onChange={this.handleChange} />
        <span className="toggle-item" />
      </label>
    )
  }
}

Toggle.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  truthy: PropTypes.string,
  falsy: PropTypes.string,
  checked: PropTypes.bool,
  value: PropTypes.any,
}

Toggle.defaultProps = {
  truthy: undefined,
  falsy: undefined,
  checked: false,
  value: undefined,
}

export default Toggle
