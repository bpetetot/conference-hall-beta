import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import PreviewMarkdown from './preview'
import './markdownInput.css'

class MarkdownInput extends Component {
  state = {
    focus: false,
  }

  toggleFocus = focus => () => {
    this.setState({ focus })
  }

  render() {
    const { name, value } = this.props
    const { focus } = this.state
    return (
      <div className="markdown-input">
        <textarea
          id={name}
          {...this.props}
          onFocus={this.toggleFocus(true)}
          onBlur={this.toggleFocus(false)}
        >
          {value}
        </textarea>
        <PreviewMarkdown
          markdown={this.props.value}
          className={cn({ 'markdown-input-focus': focus })}
        />
      </div>
    )
  }
}

MarkdownInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
}

MarkdownInput.defaultProps = {
  value: undefined,
  onChange: undefined,
  onFocus: undefined,
  onBlur: undefined,
}

export default MarkdownInput
