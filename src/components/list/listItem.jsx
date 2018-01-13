import React from 'react'
import PropTypes from 'prop-types'

import './listItem.css'

const ListItem = ({
  onSelect, info, title, subtitle, ...item
}) => (
  <div className="list-item" onClick={() => onSelect(item)} role="button">
    <div>
      <div className="list-item-title">{title}</div>
      <div className=" list-item-subtitle">{subtitle}</div>
    </div>
    <div className="list-item-info">{info}</div>
  </div>
)

ListItem.propTypes = {
  onSelect: PropTypes.func.isRequired,
  title: PropTypes.node,
  subtitle: PropTypes.node,
  info: PropTypes.node,
}

ListItem.defaultProps = {
  title: undefined,
  subtitle: undefined,
  info: undefined,
}

export default ListItem
