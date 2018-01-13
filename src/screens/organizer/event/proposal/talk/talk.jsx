import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Badge from 'components/badge'
import Markdown from 'components/markdown'
import { FormatBadge, CategoryBadge } from 'screens/organizer/event/components/badges'

const Talk = ({ eventId, proposal, className }) => (
  <div className={cn(className, 'card')}>
    <h3>{proposal.title}</h3>
    <p>
      <FormatBadge eventId={eventId} formatId={proposal.formats} />
      <CategoryBadge eventId={eventId} categoryId={proposal.categories} />
      <Badge>{proposal.level}</Badge>
    </p>
    <h3>Abstract</h3>
    <Markdown source={proposal.abstract} />
    <h3>References</h3>
    <Markdown source={proposal.references} />
    <h3>Message to organizers</h3>
    <Markdown source={proposal.message} />
  </div>
)

Talk.propTypes = {
  eventId: PropTypes.string.isRequired,
  proposal: PropTypes.objectOf(PropTypes.any),
  className: PropTypes.string,
}

Talk.defaultProps = {
  proposal: {},
  className: undefined,
}

export default Talk
