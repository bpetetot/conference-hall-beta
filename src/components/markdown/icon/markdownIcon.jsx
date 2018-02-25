import React from 'react'
import PropTypes from 'prop-types'

const MarkdownIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 208 128" className={className}>
    <rect width="198" height="118" x="5" y="5" ry="10" strokeWidth="10" />
    <path d="M30 98v-68h20l20 25 20-25h20v68h-20v-39l-20 25-20-25v39zM155 98l-30-33h20v-35h20v35h20z" />
  </svg>
)

MarkdownIcon.propTypes = {
  className: PropTypes.string,
}

MarkdownIcon.defaultProps = {
  className: undefined,
}

export default MarkdownIcon
