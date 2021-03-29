import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

import { withSizes } from 'styles/utils'
import { List, ListItem } from 'components/list'
import LoadingIndicator from 'components/loader'
import ProposalSubtitle from './proposalSubtitle'
import ProposalInfo from './proposalInfo'
import { useSelection } from '../selection-context'
import './proposalsList.css'

const Proposals = ({ event, result, isFetching, isMobile }) => {
  const { proposals } = result
  const { toggleItem, isItemSelected } = useSelection()

  const navigate = useNavigate()
  const { search } = useLocation()
  const handleSelect = (proposalId) => {
    const params = new URLSearchParams(search)
    navigate(`/organizer/event/${event.id}/proposals/${proposalId}?${params.toString()}`)
  }

  if (isFetching) {
    return <LoadingIndicator />
  }

  return (
    <List
      className="event-proposals"
      array={proposals}
      renderRow={(proposal) => (
        <ListItem
          key={proposal.id}
          id={proposal.id}
          title={proposal.title}
          subtitle={!isMobile && <ProposalSubtitle event={event} proposal={proposal} />}
          info={<ProposalInfo event={event} proposal={proposal} isMobile={isMobile} />}
          onSelect={() => handleSelect(proposal.id)}
          onCheckboxChange={() => toggleItem(proposal.id)}
          checked={isItemSelected(proposal.id)}
        />
      )}
    />
  )
}

Proposals.propTypes = {
  event: PropTypes.object.isRequired,
  result: PropTypes.object,
  isFetching: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool.isRequired,
}

Proposals.defaultProps = {
  result: {},
}

export default withSizes(Proposals)
