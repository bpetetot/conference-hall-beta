import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import marked from 'marked'

import './markdown.css'

const Markdown = ({ source, className }) => (
  <div
    className={cn('markdown', className)}
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{ __html: marked(source || '') }}
  />
)

Markdown.propTypes = {
  source: PropTypes.string,
  className: PropTypes.string,
}

Markdown.defaultProps = {
  source: '',
  className: undefined,
}

export default Markdown
