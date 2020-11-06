import React from 'react'
import PropTypes from 'prop-types'

import Badge from 'components/badge'
import { useEvent } from '../useEvents'

const FormatBadge = ({ eventId, formatId, ...rest }) => {
  const { data: event } = useEvent(eventId)
  if (!event) return null
  return <Badge {...rest}>{event?.getFormat(formatId)?.name}</Badge>
}

FormatBadge.propTypes = {
  eventId: PropTypes.string.isRequired,
  formatId: PropTypes.string.isRequired,
}

export default FormatBadge
