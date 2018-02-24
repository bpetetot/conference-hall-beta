import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Markdown from 'components/markdown'
import './preview.css'

class PreviewMarkdown extends Component {
  state = {
    display: false,
  }

  render() {
    const { markdown, className } = this.props
    const { display } = this.state
    return (
      <div className={cn('preview-markdown', className, { 'preview-markdown-display': display })}>
        <div className="preview-markdown-link">
          <a
            onClick={() => this.setState({ display: !this.state.display })}
            role="button"
          >
            {this.state.display ? 'Back to edit' : 'preview'}
          </a>
        </div>
        {this.state.display && <Markdown source={markdown} className="preview-markdown-content" />}
      </div>
    )
  }
}

PreviewMarkdown.propTypes = {
  markdown: PropTypes.string,
  className: PropTypes.string,
}

PreviewMarkdown.defaultProps = {
  markdown: '### Nothing to preview',
  className: undefined,
}

export default PreviewMarkdown
