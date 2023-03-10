import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import marked from 'marked'
import DOMPurify from 'dompurify'

import './markdown.css'

function Markdown({ source, className }) {
  const html = marked(source || '')
  const safeHtml = DOMPurify.sanitize(html)
  return (
    <div
      className={cn('markdown', className)}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: safeHtml }}
    />
  )
}

Markdown.propTypes = {
  source: PropTypes.string,
  className: PropTypes.string,
}

Markdown.defaultProps = {
  source: '',
  className: undefined,
}

export default Markdown
