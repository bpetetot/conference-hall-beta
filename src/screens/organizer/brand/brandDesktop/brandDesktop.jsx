import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'redux-little-router'

import Dropdown from '../../../../components/dropdown'
import IconLabel from '../../../../components/iconLabel'
import './brandDesktop.css'

const BrandDesktop = ({ title, className }) => {
  const brand = (
    <div className={className}>
      <span>{title}</span>
      <i className="fa fa-caret-down" />
    </div>
  )
  return (
    <Dropdown className="brand-dropdown" menuClassName="brand-menu" action={brand}>
      <Link href="/">
        <IconLabel icon="fa fa-home" label="Conference Hall" />
      </Link>
    </Dropdown>
  )
}

BrandDesktop.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
}

BrandDesktop.defaultProps = {
  className: undefined,
}

export default BrandDesktop
