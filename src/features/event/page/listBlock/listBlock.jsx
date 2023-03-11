import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import IconLabel from 'components/iconLabel'
import './listBlock.css'

function ListBlock({ title, list, className }) {
  if (!list || list.length === 0) return null
  return (
    <div className={cn('list-block', className)}>
      <h3>{title}</h3>
      <ul>
        {list &&
          list.map(({ id, name, description }) => (
            <li key={id}>
              <div className="list-item-name">{name}</div>
              {description && (
                <div className="list-item-description">
                  <IconLabel icon="fa fa-caret-right" label={description} />
                </div>
              )}
            </li>
          ))}
      </ul>
    </div>
  )
}

ListBlock.propTypes = {
  title: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(PropTypes.any),
  className: PropTypes.string,
}

ListBlock.defaultProps = {
  list: [],
  className: undefined,
}

export default ListBlock
