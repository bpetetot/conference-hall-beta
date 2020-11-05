import React from 'react'
import PropTypes from 'prop-types'

import Badge from 'components/badge'
import { useEvent } from '../useEvents'

const CategoryBadge = ({ eventId, categoryId, ...rest }) => {
  const { data: event } = useEvent(eventId)
  if (!event) return null
  return <Badge {...rest}>{event?.getCategory(categoryId)?.name}</Badge>
}

CategoryBadge.propTypes = {
  eventId: PropTypes.string.isRequired,
  categoryId: PropTypes.string.isRequired,
}

export default CategoryBadge
