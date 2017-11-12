import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import { withSizes } from 'styles/utils'
import './brand.css'

import BrandMobile from './brandMobile'
import BrandDesktop from './brandDesktop'

const Brand = ({ title, isMobile, className }) => {
  if (isMobile) {
    return <BrandMobile title={title} className={cn('brand', className)} />
  }
  return <BrandDesktop title={title} className={cn('brand', className)} />
}

Brand.propTypes = {
  title: PropTypes.string.isRequired,
  isMobile: PropTypes.bool.isRequired,
  className: PropTypes.string,
}

Brand.defaultProps = {
  className: undefined,
}

export default withSizes(Brand)
