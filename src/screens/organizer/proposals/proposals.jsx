import React from 'react'
import PropTypes from 'prop-types'

import HasRole from 'screens/components/hasRole'
import { ROLE_OWNER_OR_MEMBER } from 'firebase/constants'
import { useAuth } from 'features/auth'

import ProposalsHeader from './proposalsHeader'
import ProposalsFilters from './proposalsFilters'
import ProposalsToolbar from './proposalsToolbar'
import ProposalsList from './proposalsList'
import ProposalsPaging from './proposalsPaging'

const Proposals = ({ eventId }) => {
  const { user } = useAuth()

  return (
    <div>
      <ProposalsHeader eventId={eventId} />
      <ProposalsFilters userId={user.uid} />
      <HasRole of={ROLE_OWNER_OR_MEMBER} forEventId={eventId}>
        <ProposalsToolbar eventId={eventId} userId={user.uid} />
      </HasRole>
      <ProposalsList eventId={eventId} userId={user.uid} />
      <ProposalsPaging />
    </div>
  )
}

Proposals.propTypes = {
  eventId: PropTypes.string.isRequired,
}

export default Proposals
