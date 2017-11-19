import React from 'react'
import PropTypes from 'prop-types'

import './item.css'

const Item = ({ name, onEdit, onDelete }) => (
  <div role="button" onClick={onEdit} className="item-box btn btn-link">
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

Item.propTypes = {
  name: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default Item
