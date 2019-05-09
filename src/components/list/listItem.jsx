import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import './listItem.css'

const ListItem = ({
  onSelect, info, title, subtitle, renderActions,
}) => (
  <div className={cn('list-item')}>
    {renderActions && <div className="list-item-actions">{renderActions()}</div>}
    <div className={cn('list-item-main', { clickable: onSelect })} onClick={onSelect} role="button">
      <div className="list-item-title">{title}</div>
      {subtitle && <div className=" list-item-subtitle">{subtitle}</div>}
    </div>
    <div className="list-item-info">{info}</div>
  </div>
)

ListItem.propTypes = {
  onSelect: PropTypes.func,
  renderActions: PropTypes.func,
  title: PropTypes.node,
  subtitle: PropTypes.node,
  info: PropTypes.node,
}

ListItem.defaultProps = {
  onSelect: undefined,
  renderActions: undefined,
  title: undefined,
  subtitle: undefined,
  info: undefined,
}

export default ListItem
