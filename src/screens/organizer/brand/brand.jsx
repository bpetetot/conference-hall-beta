import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'redux-little-router'
import cn from 'classnames'

import Dropdown from '../../../components/dropdown'
import IconLabel from '../../../components/iconLabel'
import './brand.css'

const Brand = ({ title, className }) => {
  const brand = (
    <div className="brand-title">
      <span>{title}</span>
      <span>
        <i className="fa fa-caret-down" />
      </span>
    </div>
  )
  return (
    <Dropdown className={cn('brand', className)} menuClassName="brand-menu" action={brand}>
      <Link href="/">
        <IconLabel icon="fa fa-home" label="Conference Hall" />
      </Link>
    </Dropdown>
  )
}

Brand.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
}

Brand.defaultProps = {
  className: undefined,
}

export default Brand
