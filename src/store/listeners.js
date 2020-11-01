import { when } from 'k-ramel'

import * as user from './reactions/user'
import * as events from './reactions/events'
import * as proposals from './reactions/proposals'
import * as ratings from './reactions/ratings'
import * as survey from './reactions/survey'

export default [
  /* user */
  when('@@ui/FETCH_USER')(user.fetchUser),
  /* events */
  when('@@ui/ON_UPDATE_EVENT_DETAILS')(events.updateEventForm),
  when('@@ui/ON_UPDATE_EVENT_CFP')(events.updateEventForm),
  when('@@ui/ON_EVENT_BANNER_UPLOADED')(events.updateEvent),
  when('@@ui/ON_TOGGLE_EVENT_SURVEY')(events.updateEvent),
  when('@@ui/ON_CHANGE_EMAIL_DESTINATION')(events.updateEvent),
  when('@@ui/ON_CHANGE_EMAIL_NOTIFICATION')(events.updateEvent),
  when('@@ui/ON_SELECT_SURVEY_QUESTION')(events.updateEvent),
  when('@@ui/ON_TOGGLE_EVENT_DELIBERATION')(events.updateEvent),
  when('@@ui/ON_TOGGLE_EVENT_DISPLAY_ORGANIZERS_RATINGS')(events.updateEvent),
  when('@@ui/ON_LOAD_EVENT')(events.fetchEvent),
  when('@@ui/ON_LOAD_ORGANIZER_EVENTS')(events.fetchOrganizerEvents),
  when('@@ui/ON_LOAD_SPEAKER_EVENTS')(events.fetchSpeakerEvents),
  when('@@ui/ON_ORGANIZER_CHANGE_EVENT')(events.organizerChangeEvent),
  when('@@ui/ON_SAVE_EVENT_SETTINGS')(events.saveEventSettings),
  /* proposals */
  when('@@ui/ON_LOAD_PROPOSAL')(proposals.getProposal),
  when('@@ui/ON_UPDATE_PROPOSAL')(proposals.updateProposal),
  when('@@ui/EXPORT_PROPOSALS')(proposals.exportProposals),
  /* ratings */
  when('@@ui/ON_LOAD_RATINGS')(ratings.fetchRatings),
  when('@@ui/RATE_PROPOSAL')(ratings.rateProposal),
  /* survey */
  when('@@ui/ON_LOAD_SURVEY')(survey.fetch),
  when('@@ui/SAVE_SPEAKER_SURVEY')(survey.save),
]
