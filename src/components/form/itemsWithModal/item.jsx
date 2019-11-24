/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Button from 'components/button'
import './item.css'

const Item = ({ name, onEdit, onDelete }) => (
  <Button secondary>
    {btn => (
      <div role="button" onClick={onEdit} className={cn('item-box', btn)}>
        <div>{name}</div>
        <a role="button" onClick={onDelete}>
          <i className="fa fa-times" />
        </a>
      </div>
    )}
  </Button>
)

Item.propTypes = {
  name: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default Item
