import React from 'react'
import PropTypes from 'prop-types'

import './brandDesktop.css'

const BrandDesktop = ({ title, className }) => <div className={className}>{title}</div>

BrandDesktop.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
}

BrandDesktop.defaultProps = {
  className: undefined,
}

export default BrandDesktop
