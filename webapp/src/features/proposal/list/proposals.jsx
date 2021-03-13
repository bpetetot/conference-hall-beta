import React from 'react'
import PropTypes from 'prop-types'

import HasRole from 'features/organization/hasRole'
import { ROLE_OWNER_OR_MEMBER } from 'features/organization/constants'
import { useOrganizerProposals } from 'data/proposal'

import ProposalsHeader from './proposalsHeader'
import ProposalsFilters from './proposalsFilters'
import ProposalsToolbar from './proposalsToolbar'
import ProposalsList from './proposalsList'
import ProposalsPaging from './proposalsPaging'
import { SelectionProvider } from './selection-context'

const Proposals = ({ event }) => {
  const { data: result, isFetching, isError, error } = useOrganizerProposals(event.id)

  if (isError) {
    return <div>An unexpected error has occurred: {error.message}</div>
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

Proposals.propTypes = {
  event: PropTypes.object.isRequired,
}

export default Proposals
