import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

import './markdown.css'

function Markdown({ source, className }) {
  const renderer = new marked.Renderer()
  renderer.link = function (href, title, text) {
    const link = marked.Renderer.prototype.link.call(this, href, title, text)
    return link.replace("<a", "<a target='_blank' ")
  }
  const html = marked.parse(source || '', { renderer })
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
