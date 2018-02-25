import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import IconLabel from 'components/iconLabel'
import Markdown, { MarkdownIcon } from 'components/markdown'
import './preview.css'

class PreviewMarkdown extends Component {
  state = { display: false }

  handleDisplay = () => {
    this.setState(
      state => ({ display: !state.display }),
      () => this.props.onDisplay(this.state.display),
    )
  }

  render() {
    const { markdown, className } = this.props
    const { display } = this.state
    return (
      <div className={cn('preview-markdown', { 'preview-markdown-display': display }, className)}>
        {display && <Markdown source={markdown} className="preview-markdown-content" />}
        <div className="preview-markdown-bar">
          <div className="preview-markdown-icon">
            <MarkdownIcon />
            <span>&nbsp;markdown is supported</span>
          </div>
          <a onClick={this.handleDisplay} role="button">
            {display ? (
              <IconLabel icon="fa fa-pencil" label="write" />
            ) : (
              <IconLabel icon="fa fa-eye" label="preview" />
            )}
          </a>
        </div>
      </div>
    )
  }
}

PreviewMarkdown.propTypes = {
  markdown: PropTypes.string,
  onDisplay: PropTypes.func.isRequired,
  className: PropTypes.string,
}

PreviewMarkdown.defaultProps = {
  markdown: '### Nothing to preview',
  className: undefined,
}

export default PreviewMarkdown
