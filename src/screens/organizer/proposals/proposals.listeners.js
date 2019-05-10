import { when } from 'k-ramel'

import * as reactions from './proposals.reactions'

export default [
  when('@@krml/LISTENERS>ADDED>PROPOSALS')(reactions.setProposalFiltersFromRouter),
  when('@@ui/ON_LOAD_EVENT_PROPOSALS')(reactions.loadProposals),
  when('@@ui/ON_SELECT_PROPOSAL')(reactions.selectProposal),
  when('@@ui/SELECT_ALL_PROPOSALS')(reactions.selectAllProposal),
  when('@@ui/ON_ADD_PROPOSAL_TO_SELECTION')(reactions.addProposalToSelection),
  when('@@krf/UPDATE>UI_ORGANIZER>PROPOSALS')(reactions.changeFilter),
]
