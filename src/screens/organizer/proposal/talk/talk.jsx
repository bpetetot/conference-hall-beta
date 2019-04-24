import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Badge from 'components/badge'
import Markdown from 'components/markdown'
import { FormatBadge, CategoryBadge } from 'screens/components/event/badges'
import './talk.css'

const Talk = ({ eventId, proposal, className }) => (
  <div className={cn(className, 'card')}>
    <h2>{proposal.title} </h2>
    <div className="proposal-talk-badges">
      <FormatBadge
        outline
        pill
        light
        eventId={eventId}
        formatId={proposal.formats}
      />
      <CategoryBadge
        outline
        pill
        light
        eventId={eventId}
        categoryId={proposal.categories}
      />
      <Badge outline pill light>
        {proposal.level}
      </Badge>
      <Badge outline pill light>
        {proposal.language}
      </Badge>
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
