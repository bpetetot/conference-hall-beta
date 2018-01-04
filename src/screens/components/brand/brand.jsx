import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { Link } from 'redux-little-router'

import { withSizes } from 'styles/utils'
import BrandMobile from './brandMobile'
import './brand.css'

const Brand = ({
  title, baseRoute, isMobile, className,
}) => {
  if (isMobile && baseRoute !== '/') {
    return <BrandMobile className={cn('brand', className)} />
  }
  return (
    <div className={cn('brand', className)}>
      <Link href={baseRoute}>{title}</Link>
    </div>
  )
}

Brand.propTypes = {
  title: PropTypes.string.isRequired,
  isMobile: PropTypes.bool.isRequired,
  baseRoute: PropTypes.string.isRequired,
  className: PropTypes.string,
}

Brand.defaultProps = {
  className: undefined,
}

export default withSizes(Brand)
