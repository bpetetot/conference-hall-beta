import React from 'react'
import PropTypes from 'prop-types'
import capitalize from 'lodash/capitalize'
import cn from 'classnames'
import { withSizes } from 'styles/utils'

import SubmitTalkLink from 'features/talk/submitTalksLink'

import styles from './banner.module.css'

const EventBanner = ({
  eventId,
  name,
  type,
  address,
  bannerUrl,
  cfpOpened,
  className,
  isMobile,
}) => {
  const bannerStyle = bannerUrl ? { backgroundImage: `url('${bannerUrl}')` } : {}
  return (
    <div className={cn(styles.banner, className)} style={bannerStyle}>
      <div className={styles.layer} />
      <div className={styles.rightSide}>
        <h1 className={styles.title}>{name}</h1>
        <p className={styles.subtitle}>
          {capitalize(type)}
          {address && ` • ${address}`}
        </p>
        <div className={styles.actions}>
          <SubmitTalkLink
            eventId={eventId}
            displayed={cfpOpened}
            size={isMobile ? 'small' : 'normal'}
          />
        </div>
      </div>
    </div>
  )
}

EventBanner.propTypes = {
  eventId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  address: PropTypes.string,
  bannerUrl: PropTypes.string,
  cfpOpened: PropTypes.bool,
  className: PropTypes.string,
  isMobile: PropTypes.bool.isRequired,
}

EventBanner.defaultProps = {
  bannerUrl: undefined,
  address: undefined,
  cfpOpened: false,
  className: undefined,
}

export default withSizes(EventBanner)
