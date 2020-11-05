import React from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'

import HasRole from 'features/organization/hasRole'
import { ROLE_OWNER_OR_MEMBER } from 'firebase/constants'
import { useAuth } from 'features/auth'
import { useEvent } from 'features/event/useEvents'
import { useEventSettings } from 'features/event/useEventSettings'
import { LoadingIndicator } from 'components/loader'
import ProposalsHeader from './proposalsHeader'
import ProposalsFilters from './proposalsFilters'
import ProposalsToolbar from './proposalsToolbar'
import ProposalsList from './proposalsList'
import ProposalsPaging from './proposalsPaging'

const Proposals = ({ eventId }) => {
  const { user } = useAuth()
  const { isLoading } = useEvent(eventId)
  const { isLoading: isLoadingSettings } = useEventSettings(eventId)

  const { search } = useLocation()
  const params = new URLSearchParams(search)
  const filters = {
    search: params.get('search'),
    state: params.get('state'),
    ratings: params.get('ratings'),
    formats: params.get('formats'),
    categories: params.get('categories'),
    sortOrder: params.get('sortOrder'),
  }

  if (isLoading || isLoadingSettings) return <LoadingIndicator />

  return (
    <div>
      <ProposalsHeader eventId={eventId} />
      <ProposalsFilters eventId={eventId} />
      <HasRole of={ROLE_OWNER_OR_MEMBER} forEventId={eventId}>
        <ProposalsToolbar eventId={eventId} userId={user.uid} filters={filters} />
      </HasRole>
      <ProposalsList eventId={eventId} userId={user.uid} filters={filters} />
      <ProposalsPaging />
    </div>
  )
}

Proposals.propTypes = {
  eventId: PropTypes.string.isRequired,
}

export default Proposals
