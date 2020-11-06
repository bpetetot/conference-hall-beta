import { when } from 'k-ramel'

import * as proposals from './reactions/proposals'

export default [
  /* proposals */
  when('@@ui/ON_LOAD_PROPOSAL')(proposals.getProposal),
  when('@@ui/ON_UPDATE_PROPOSAL')(proposals.updateProposal),
  when('@@ui/EXPORT_PROPOSALS')(proposals.exportProposals),
]
