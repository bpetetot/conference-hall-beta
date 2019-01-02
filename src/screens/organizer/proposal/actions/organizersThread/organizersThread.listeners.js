import { when } from 'k-ramel'

import * as reactions from './organizersThread.reactions'

export default [
  when('@@ui/ON_LOAD_PROPOSAL_ORGANIZERS_MESSAGES')(reactions.loadMessages),
  when('@@ui/ON_ADD_PROPOSAL_ORGANIZERS_MESSAGE')(reactions.addMessage),
]
