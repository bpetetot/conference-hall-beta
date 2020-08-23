import { when } from 'k-ramel'

import * as reactions from './proposals.reactions'

export default [
  when('@@ui/ON_LOAD_EVENT_PROPOSALS')(reactions.loadProposals),
  when('@@ui/SELECT_ALL_PROPOSALS')(reactions.selectAllProposal),
  when('@@ui/SEND_EMAIL_FOR_PROPOSALS')(reactions.sendEmails),
  when('@@ui/ACCEPT_PROPOSALS')(reactions.acceptProposals),
  when('@@ui/REJECT_PROPOSALS')(reactions.rejectProposals),
  when('@@ui/ON_ADD_PROPOSAL_TO_SELECTION')(reactions.addProposalToSelection),
]
