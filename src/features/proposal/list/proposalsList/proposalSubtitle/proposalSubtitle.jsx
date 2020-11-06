import React from 'react'
import PropTypes from 'prop-types'

import Inline from 'components/inline'

import './proposalSubtitle.css'
import { useEvent } from 'features/event/useEvents'

const ProposalSubtitle = ({ eventId, proposal, blindRating }) => {
  const { data: event } = useEvent(eventId)
  const { formats, categories } = proposal
  const speakerName = blindRating ? '' : proposal.speakerName
  return (
    <Inline className="proposal-subtitle" classNameItem="proposal-subtitle-item">
      {!!speakerName && `by ${speakerName}`}
      {event?.getFormat(formats)?.name}
      {event?.getCategory(categories)?.name}
    </Inline>
  )
}

ProposalSubtitle.propTypes = {
  eventId: PropTypes.string.isRequired,
  blindRating: PropTypes.bool,
  proposal: PropTypes.any,
}

ProposalSubtitle.defaultProps = {
  blindRating: false,
  proposal: {},
}

export default ProposalSubtitle
