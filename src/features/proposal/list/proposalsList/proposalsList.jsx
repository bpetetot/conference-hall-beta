import React, { useCallback, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

import { withSizes } from 'styles/utils'
import { List, ListItem } from 'components/list'
import ProposalSubtitle from './proposalSubtitle'
import ProposalInfo from './proposalInfo'
import './proposalsList.css'

function Proposals({
  eventId,
  proposals,
  proposalsSelection,
  deliberationActive,
  blindRating,
  onAddProposalToSelection,
  onLoad,
  filters,
  isMobile,
}) {
  useEffect(() => {
    onLoad({ filters })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters])

  const navigate = useNavigate()
  const { search } = useLocation()
  const handleSelect = useCallback(
    (proposalId) => {
      const params = new URLSearchParams(search)
      navigate(`/organizer/event/${eventId}/proposals/${proposalId}?${params.toString()}`)
    },
    [navigate, eventId, search],
  )

  return (
    <List
      className="event-proposals"
      array={proposals}
      renderRow={(proposal) => (
        <ListItem
          key={proposal.id}
          id={proposal.id}
          title={proposal.title}
          subtitle={
            !isMobile && (
              <ProposalSubtitle eventId={eventId} proposal={proposal} blindRating={blindRating} />
            )
          }
          info={<ProposalInfo eventId={eventId} proposal={proposal} isMobile={isMobile} />}
          onSelect={() => handleSelect(proposal.id)}
          onCheckboxChange={() => onAddProposalToSelection(proposal.id)}
          checked={!!proposalsSelection.includes(proposal.id)}
          checkboxDisabled={!deliberationActive}
        />
      )}
    />
  )
}

Proposals.propTypes = {
  eventId: PropTypes.string.isRequired,
  proposals: PropTypes.arrayOf(PropTypes.object),
  proposalsSelection: PropTypes.arrayOf(PropTypes.string),
  deliberationActive: PropTypes.bool,
  blindRating: PropTypes.bool,
  onAddProposalToSelection: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
  onLoad: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
}

Proposals.defaultProps = {
  proposals: [],
  proposalsSelection: [],
  deliberationActive: false,
  blindRating: false,
}

export default withSizes(Proposals)
