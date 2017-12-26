import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import { withSizes } from 'styles/utils'
import BrandMobile from './brandMobile'
import './brand.css'

const Brand = ({
  title, app, opened, isMobile, goBack, className,
}) =>
  (isMobile ? (
    <BrandMobile
      title={title}
      className={cn('brand', className)}
      app={app}
      goBack={goBack}
      opened={opened}
    />
  ) : (
    <div className={cn('brand', className)}>{title}</div>
  ))

Brand.propTypes = {
  title: PropTypes.string.isRequired,
  isMobile: PropTypes.bool.isRequired,
  app: PropTypes.string.isRequired,
  opened: PropTypes.bool.isRequired,
  goBack: PropTypes.func.isRequired,
  className: PropTypes.string,
}

Brand.defaultProps = {
  className: undefined,
}

export default withSizes(Brand)
