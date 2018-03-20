import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import './inputButton.css'

class InputButton extends Component {
  state = { value: this.props.defaultValue }

  handleChange = (e) => {
    this.setState({ value: e.target.value })
    if (this.props.onChange) this.props.onChange(e)
  }

  handleClick = () => this.props.onClick(this.state.value)

  handleKeyPress = (e) => {
    if (e.charCode === 13) {
      this.props.onClick(this.state.value)
    }
  }

  render() {
    const {
      btnLabel,
      className,
      btnClassName,
      defaultValue,
      onClick,
      disabled,
      ...inputProps
    } = this.props

    return (
      <div className={cn('input-button', className)}>
        <input
          defaultValue={this.state.value}
          {...inputProps}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
        />
        <button
          onClick={this.handleClick}
          className={cn('btn', btnClassName)}
          disabled={!this.state.value || disabled}
        >
          {btnLabel}
        </button>
      </div>
    )
  }
}

InputButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  btnLabel: PropTypes.node.isRequired,
  defaultValue: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  btnClassName: PropTypes.string,
}

InputButton.defaultProps = {
  onChange: undefined,
  className: undefined,
  defaultValue: undefined,
  disabled: false,
  btnClassName: undefined,
}

export default InputButton
