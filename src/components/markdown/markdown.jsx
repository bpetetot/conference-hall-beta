import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import snarkdown from 'helpers/snarkdown'
import escape from 'lodash/escape'

import './markdown.css'

const Markdown = ({ source, className }) => (
  <div
    className={cn('markdown', className)}
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{ __html: escape(snarkdown(source)) }}
  />
)

Markdown.propTypes = {
  source: PropTypes.string,
  className: PropTypes.string,
}

Markdown.defaultProps = {
  source: undefined,
  className: undefined,
}

export default Markdown
