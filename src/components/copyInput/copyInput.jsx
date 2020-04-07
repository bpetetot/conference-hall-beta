import React, { PureComponent } from 'react'
import cn from 'classnames'
import PropTypes from 'prop-types'

import Button from 'components/button'
import './copyInput.css'

class CopyInput extends PureComponent {
  setInput = (element) => {
    this.input = element
  }

  select = () => this.input.select()

  copy = () => {
    this.select()
    document.execCommand('Copy')
  }

  render() {
    const { title, value, className } = this.props
    return (
      <div className={cn('copy-input', className)}>
        {title && (
          <label htmlFor="copy-input" className="copy-title">
            {title}
          </label>
        )}
        <input
          id="copy-input"
          type="text"
          ref={this.setInput}
          onFocus={this.select}
          placeholder="Just copy it"
          defaultValue={value}
        />
        <Button tertiary onClick={this.copy}>
          <i className="fa fa-clipboard" />
        </Button>
      </div>
    )
  }
}

CopyInput.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
}

CopyInput.defaultProps = {
  title: undefined,
  value: undefined,
  className: undefined,
}

export default CopyInput
