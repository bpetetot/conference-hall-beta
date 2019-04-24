import { when } from 'k-ramel'

import * as reactions from './organizersThread.reactions'

export default [
  when('@@ui/ON_LOAD_PROPOSAL_ORGANIZERS_MESSAGES')(reactions.loadMessages),
  when('@@ui/ON_SAVE_PROPOSAL_ORGANIZERS_MESSAGE')(reactions.saveMessage),
  when('@@ui/ON_DELETE_PROPOSAL_ORGANIZERS_MESSAGE')(reactions.deleteMessage),
]
