import React from 'react'
import { useParams } from 'react-router'

import HasRole from 'features/organization/hasRole'
import { ROLE_OWNER_OR_MEMBER } from 'firebase/constants'
import { useOrganizerEvent } from 'data/event'
import { LoadingIndicator } from 'components/loader'
import { useOrganizerProposals } from 'data/proposal'

import ProposalsHeader from './proposalsHeader'
import ProposalsFilters from './proposalsFilters'
import ProposalsToolbar from './proposalsToolbar'
import ProposalsList from './proposalsList'
import ProposalsPaging from './proposalsPaging'
import { SelectionProvider } from './selection-context'

const Proposals = () => {
  const { eventId } = useParams()
  const { data: event } = useOrganizerEvent(eventId)
  const { data: result, isFetching } = useOrganizerProposals(eventId)

  if (!event) {
    return <LoadingIndicator />
  }

  return (
    <div>
      <ProposalsHeader result={result} />
      <SelectionProvider total={result.total}>
        <ProposalsFilters event={event} />
        <HasRole of={ROLE_OWNER_OR_MEMBER} forEvent={event}>
          <ProposalsToolbar event={event} result={result} />
        </HasRole>
        <ProposalsList event={event} result={result} isFetching={isFetching} />
      </SelectionProvider>
      <ProposalsPaging event={event} result={result} />
    </div>
  )
}

export default Proposals
