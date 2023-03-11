import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Checkbox from 'components/form/checkbox'

import './listItem.css'

function ListItem({
  onSelect,
  id,
  info,
  title,
  subtitle,
  checked,
  onCheckboxChange,
  checkboxDisabled,
  renderActions,
}) {
  return (
    <div className={cn('list-item')}>
      {onCheckboxChange && (
        <div className="list-item-checkbox">
          <Checkbox
            name={id}
            onChange={onCheckboxChange}
            value={checked}
            disabled={checkboxDisabled}
            aria-label={`Select proposal ${title}`}
          />
        </div>
      )}
      <div
        className={cn('list-item-main', { clickable: onSelect })}
        onClick={onSelect}
        onKeyPress={(e) => {
          if (e.key !== 'Enter') return
          onSelect()
        }}
        role="button"
        tabIndex="0"
      >
        <div className="list-item-title">{title}</div>
        {subtitle && <div className=" list-item-subtitle">{subtitle}</div>}
      </div>
      <div className="list-item-info">{info}</div>
      {renderActions && <div className="list-item-actions">{renderActions()}</div>}
    </div>
  )
}

ListItem.propTypes = {
  onSelect: PropTypes.func,
  onCheckboxChange: PropTypes.func,
  checked: PropTypes.bool,
  checkboxDisabled: PropTypes.bool,
  renderActions: PropTypes.func,
  title: PropTypes.node,
  subtitle: PropTypes.node,
  info: PropTypes.node,
  id: PropTypes.string,
}

ListItem.defaultProps = {
  onSelect: undefined,
  onCheckboxChange: undefined,
  checked: false,
  checkboxDisabled: false,
  renderActions: undefined,
  title: undefined,
  subtitle: undefined,
  info: undefined,
  id: undefined,
}

export default ListItem
