import React from 'react'
import PropTypes from 'prop-types'
import Markdown from 'react-markdown'

const DescriptionBlock = ({ description, className }) => (
  <div className={className}>
    <Markdown className="markdown" source={description} escapeHtml />
  </div>
)

DescriptionBlock.propTypes = {
  description: PropTypes.string,
  className: PropTypes.string,
}

DescriptionBlock.defaultProps = {
  description: undefined,
  className: undefined,
}

export default DescriptionBlock
