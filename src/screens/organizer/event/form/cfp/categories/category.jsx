import React from 'react'
import PropTypes from 'prop-types'

import './category.css'

const Category = ({ name, onEdit, onDelete }) => (
  <div role="button" onClick={onEdit} className="category-box btn btn-link">
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

Category.propTypes = {
  name: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default Category
