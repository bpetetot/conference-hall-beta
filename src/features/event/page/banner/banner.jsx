import React from 'react'
import PropTypes from 'prop-types'
import capitalize from 'lodash/capitalize'
import cn from 'classnames'
import { withSizes } from 'styles/utils'

import { useEvent } from 'features/event/useEvents'
import SubmitTalkLink from 'features/talk/components/submitTalksLink'

import styles from './banner.module.css'

const EventBanner = ({ eventId, className, isMobile }) => {
  const { data: event } = useEvent(eventId)

  const bannerStyle = event?.bannerUrl ? { backgroundImage: `url('${event?.bannerUrl}')` } : {}
  return (
    <div className={cn(styles.banner, className)} style={bannerStyle}>
      <div className={styles.layer} />
      <div className={styles.rightSide}>
        <div className={styles.title}>{event?.name}</div>
        <div className={styles.subtitle}>
          {capitalize(event?.type)}
          {event?.address && ` • ${event?.address.formattedAddress}`}
        </div>
        <div className={styles.actions}>
          <SubmitTalkLink eventId={eventId} size={isMobile ? 'small' : 'normal'} />
        </div>
      </div>
    </div>
  )
}

EventBanner.propTypes = {
  eventId: PropTypes.string.isRequired,
  className: PropTypes.string,
  isMobile: PropTypes.bool.isRequired,
}

EventBanner.defaultProps = {
  className: undefined,
}

export default withSizes(EventBanner)
