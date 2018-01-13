import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Badge from 'components/badge'
import Markdown from 'components/markdown'
import { FormatBadge, CategoryBadge } from 'screens/organizer/event/components/badges'
import './talk.css'

const Talk = ({ eventId, proposal, className }) => (
  <div className={cn(className, 'card')}>
    <div className="proposal-talk-badges">
      <FormatBadge eventId={eventId} formatId={proposal.formats} />
      <CategoryBadge eventId={eventId} categoryId={proposal.categories} />
      <Badge>{proposal.level}</Badge>
    </div>
    <div className="proposal-talk-info">
      <Markdown source={proposal.abstract} />
      {proposal.references && <h3>References</h3>}
      <Markdown source={proposal.references} />
      {proposal.comments && <h3>Message to organizers</h3>}
      <Markdown source={proposal.comments} />
    </div>
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
