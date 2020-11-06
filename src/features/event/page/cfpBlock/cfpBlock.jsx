import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import get from 'lodash/get'

import './cfpBlock.css'
import { formatDate } from 'helpers/date'

function getCfpLabel(cfpState) {
  if (cfpState === 'not-started') return 'is not open yet'
  if (cfpState === 'opened') return 'is opened'
  return 'is closed'
}

const CfpBlock = ({ event, className }) => {
  const { cfpDates, deliberationDate, address } = event

  const eventTimezone = get(address, 'timezone.id', 'Europe/Paris')
  const cfpState = event.getCfpState()
  const { start, end } = event.getCfpOpeningDates(eventTimezone) || {}
  const startFormatted = start && formatDate(cfpDates?.start, 'large')
  const endFormatted = end && formatDate(cfpDates?.end, 'large')
  const deliberationFormatted = formatDate(deliberationDate, 'large')

  return (
    <div className={cn('cfp-block', className, `cfp-block-${cfpState}`)}>
      <div className="cfp-block-title">Call for paper {getCfpLabel(cfpState)}</div>
      {event.isConference() && (
        <div className="cfp-block-subtitle">
          {cfpState === 'not-started' && !!start && `Will open ${startFormatted}`}
          {cfpState === 'opened' && !!end && `Until ${endFormatted}`}
          {cfpState === 'closed' &&
            deliberationFormatted &&
            `Deliberation date will be ${deliberationFormatted}`}
        </div>
      )}
    </div>
  )
}

CfpBlock.propTypes = {
  event: PropTypes.any.isRequired,
  className: PropTypes.string,
}

CfpBlock.defaultProps = {
  className: undefined,
}

export default CfpBlock
