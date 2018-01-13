import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import MarkdownComp from 'react-markdown'
import './markdown.css'

const Markdown = ({ source, className }) => {
  if (!source) return null
  return <MarkdownComp className={cn('markdown', className)} source={source} escapeHtml />
}

Markdown.propTypes = {
  source: PropTypes.string,
  className: PropTypes.string,
}

Markdown.defaultProps = {
  source: undefined,
  className: undefined,
}

export default Markdown
