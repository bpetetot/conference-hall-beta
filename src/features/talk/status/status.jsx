/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Badge from 'components/badge'
import './status.css'
import { useTalk } from '../useTalks'

const Status = ({ talkId, eventId, loaded, cfpOpened, className, displayCfpStatus }) => {
  const { data: talk, isLoading } = useTalk(talkId)

  if (!loaded || isLoading) return null

  const submission = talk.getSubmission(eventId)
  const submitted = talk.isSubmitted(eventId)
  const outOfDate = talk.isSubmissionOutOfDate(eventId)
  const accepted = submission?.isAccepted()
  const rejected = submission?.isRejected()
  const confirmed = submission?.isConfirmed()
  const declined = submission?.isDeclined()

  return (
    <div className={cn('submission-status', className)}>
      {outOfDate && cfpOpened && <Badge warning>Out of date</Badge>}
      {!cfpOpened && displayCfpStatus && <Badge error>CFP closed</Badge>}
      {accepted && (
        <Badge success outline>
          Accepted
        </Badge>
      )}
      {rejected && (
        <Badge error outline>
          Not accepted
        </Badge>
      )}
      {confirmed && (
        <Badge success outline>
          Confirmed
        </Badge>
      )}
      {declined && (
        <Badge error outline>
          Declined
        </Badge>
      )}
      {submitted && !accepted && !rejected && !declined && !confirmed && (
        <Badge outline>Submitted</Badge>
      )}
    </div>
  )
}

Status.propTypes = {
  talkId: PropTypes.string.isRequired,
  eventId: PropTypes.string.isRequired,
  loaded: PropTypes.bool,
  cfpOpened: PropTypes.bool,
  displayCfpStatus: PropTypes.bool,
  className: PropTypes.string,
}

Status.defaultProps = {
  loaded: false,
  cfpOpened: true,
  displayCfpStatus: true,
  className: undefined,
}

export default Status
