import React from 'react'
import PropTypes from 'prop-types'

import './format.css'

const Format = ({ name, onEdit, onDelete }) => (
  <div role="button" onClick={onEdit} className="format-box btn btn-link">
    <div>{name}</div>
    <a
      role="button"
      onClick={(e) => {
        onDelete()
        e.stopPropagation()
      }}
    >
      <i className="fa fa-times" />
    </a>
  </div>
)

Format.propTypes = {
  name: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default Format
