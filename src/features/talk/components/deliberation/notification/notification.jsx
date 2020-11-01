import React from 'react'
import PropTypes from 'prop-types'

import Button from 'components/button'
import Alert from 'components/alert'
import { useUpdateSubmissionState } from 'features/submission/useSubmissions'

const Notification = ({ talkId, eventId, name, className }) => {
  const title = `This talk has been accepted at ${name}.`

  const onConfirm = useUpdateSubmissionState(talkId, eventId, 'confirmed')
  const onDecline = useUpdateSubmissionState(talkId, eventId, 'declined')

  return (
    <Alert
      type="info"
      className={className}
      title={title}
      actionButtons={
        <>
          <Button onClick={onConfirm} primary>
            I confirm my presence
          </Button>
          <Button onClick={onDecline} primary error>
            I cancel my presence
          </Button>
        </>
      }
    />
  )
}

Notification.propTypes = {
  talkId: PropTypes.string.isRequired,
  eventId: PropTypes.string.isRequired,
  name: PropTypes.string,
  className: PropTypes.string,
}

Notification.defaultProps = {
  name: undefined,
  className: undefined,
}

export default Notification
