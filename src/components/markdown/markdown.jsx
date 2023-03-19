import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

import './markdown.css'

marked.use({
  renderer: {
    link(href, title, text) {
      const link = marked.Renderer.prototype.link.call(this, href, title, text)
      return link.replace('<a', "<a target='_blank' ")
    },
  },
})

function Markdown({ source, className }) {
  const html = marked.parse(source || '')
  const safeHtml = DOMPurify.sanitize(html, { ADD_ATTR: ['target'] })
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
