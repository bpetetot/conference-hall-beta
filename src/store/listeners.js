import { when } from 'k-ramel'

import * as events from './reactions/events'
import * as proposals from './reactions/proposals'

export default [
  /* events */
  when('@@ui/ON_LOAD_ORGANIZER_EVENTS')(events.fetchOrganizerEvents),
  when('@@ui/ON_LOAD_SPEAKER_EVENTS')(events.fetchSpeakerEvents),
  /* proposals */
  when('@@ui/ON_LOAD_PROPOSAL')(proposals.getProposal),
  when('@@ui/ON_UPDATE_PROPOSAL')(proposals.updateProposal),
  when('@@ui/EXPORT_PROPOSALS')(proposals.exportProposals),
]
