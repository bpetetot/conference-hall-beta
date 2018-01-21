import React from 'react'
import PropTypes from 'prop-types'

import RelativeDate from 'components/relativeDate'
import Badge from 'components/badge'
import { FormatBadge, CategoryBadge } from 'screens/organizer/event/components/badges'

import './proposalSubtitle.css'

const ProposalSubtitle = ({ eventId, proposal }) => (
  <div className="proposal-subtitle">
    <RelativeDate date={proposal.updateTimestamp} />
    <FormatBadge eventId={eventId} formatId={proposal.formats} />
    <CategoryBadge eventId={eventId} categoryId={proposal.categories} />
    {proposal.state && <Badge>{proposal.state}</Badge>}
  </div>
)

ProposalSubtitle.propTypes = {
  eventId: PropTypes.string.isRequired,
  proposal: PropTypes.objectOf(PropTypes.any),
}

ProposalSubtitle.defaultProps = {
  proposal: {},
}

export default ProposalSubtitle
