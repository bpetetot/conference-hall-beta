import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import PreviewMarkdown from './preview'
import './markdownInput.css'

class MarkdownInput extends Component {
  state = { focus: false }

  toggleFocus = focus => () => this.setState({ focus })

  handlePreview = preview => !preview && this.textarea.focus()

  render() {
    const { name, value } = this.props
    const { focus } = this.state
    return (
      <div className="markdown-input">
        <textarea
          id={name}
          ref={(e) => {
            this.textarea = e
          }}
          {...this.props}
          onFocus={this.toggleFocus(true)}
          onBlur={this.toggleFocus(false)}
        >
          {value}
        </textarea>
        <PreviewMarkdown
          markdown={value}
          onDisplay={this.handlePreview}
          className={cn({ 'markdown-input-focus': focus })}
        />
      </div>
    )
  }
}

MarkdownInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
}

MarkdownInput.defaultProps = {
  value: undefined,
}

export default MarkdownInput
