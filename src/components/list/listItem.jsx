import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import './listItem.css'

const ListItem = ({
  onSelect, info, title, subtitle,
}) => (
  <div className={cn('list-item', { clickable: onSelect })} onClick={onSelect} role="button">
    <div>
      <div className="list-item-title">{title}</div>
      <div className=" list-item-subtitle">{subtitle}</div>
    </div>
    <div className="list-item-info">{info}</div>
  </div>
)

ListItem.propTypes = {
  onSelect: PropTypes.func,
  title: PropTypes.node,
  subtitle: PropTypes.node,
  info: PropTypes.node,
}

ListItem.defaultProps = {
  onSelect: undefined,
  title: undefined,
  subtitle: undefined,
  info: undefined,
}

export default ListItem
