import React, { PureComponent } from 'react'
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
    const { title, value } = this.props
    return (
      <div className="copy-input">
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
        <Button secondary onClick={this.copy}>
          <i className="fa fa-clipboard" />
        </Button>
      </div>
    )
  }
}

CopyInput.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
}

CopyInput.defaultProps = {
  title: undefined,
  value: undefined,
}

export default CopyInput
