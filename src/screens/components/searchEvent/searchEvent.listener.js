import { when } from 'k-ramel'

import * as reactions from './searchEvent.reactions'

export default [
  when('@@ui/ON_CHANGE_SEARCH_EVENTS_QUERY')(reactions.setSearchEventsQuery),
]
