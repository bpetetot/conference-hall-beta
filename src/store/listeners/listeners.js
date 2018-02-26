import { when } from 'k-ramel'

import * as app from './reactions/app'
import * as router from './reactions/router'
import * as auth from './reactions/auth'
import * as firebase from './reactions/firebase'
import * as user from './reactions/user'
import * as talks from './reactions/talks'
import * as events from './reactions/events'
import * as organizations from './reactions/organizations'
import * as submissions from './reactions/submissions'
import * as proposals from './reactions/proposals'
import * as ratings from './reactions/ratings'

export default [
  /* app loaded */
  when('@@krml/INIT')(firebase.init),
  when('@@krml/INIT')(app.init),
  when('@@krml/INIT')(router.init),
  /* router */
  when('ROUTER_LOCATION_CHANGED')(router.onRouteChanged),
  /* firebase actions */
  when('@@firebase/SIGNED_IN')(auth.signedIn),
  when('@@firebase/SIGNED_OUT')(auth.signedOut),
  /* authentication */
  when('@@ui/SIGN_IN')(auth.signin),
  when('@@ui/SIGN_OUT')(auth.signout),
  /* user */
  when('@@ui/FETCH_USER')(user.fetchUser),
  when('@@ui/SAVE_PROFILE')(user.saveProfile),
  /* talks */
  when('@@ui/ON_CREATE_TALK')(talks.createTalk),
  when('@@ui/ON_UPDATE_TALK')(talks.updateTalk),
  when('@@ui/ON_LOAD_TALK')(talks.fetchTalk),
  when('@@ui/ON_LOAD_SPEAKER_TALKS')(talks.fetchSpeakerTalks),
  when('@@ui/ON_SEARCH_CO_SPEAKER')(talks.searchSpeakerByEmail),
  when(/@@ui\/(.*)_SPEAKER_TO_TALK/g)(talks.updateSpeakerToTalk),
  /* events */
  when('@@ui/ON_CREATE_EVENT')(events.createEvent),
  when('@@ui/ON_UPDATE_EVENT_DETAILS')(events.updateEvent('event-edit')),
  when('@@ui/ON_UPDATE_EVENT_CFP')(events.updateEvent('cfp-edit')),
  when('@@ui/ON_LOAD_EVENT')(events.fetchEvent),
  when('@@ui/ON_LOAD_ORGANIZER_EVENTS')(events.fetchOrganizerEvents),
  /* organizations */
  when('@@ui/ON_CREATE_ORGANIZATION')(organizations.createOrganization),
  /* submissions */
  when('@@ui/GO_TO_EVENT_SUBMISSION')(submissions.openEventSubmission),
  when('@@ui/GO_TO_SELECT_SUBMISSION')(submissions.openSelectSubmission),
  when('@@ui/ON_SUBMIT_TALK_TO_EVENT')(submissions.submitTalkToEvent),
  when('@@ui/ON_REMOVE_TALK_FROM_EVENT')(submissions.removeTalkFromEvent),
  /* proposals */
  when('@@ui/ON_LOAD_PROPOSAL')(proposals.getProposal),
  when('@@ui/ON_LOAD_EVENT_PROPOSALS')(proposals.loadEventProposals),
  when('@@krf/UPDATE>UI_ORGANIZER>PROPOSALS')(proposals.loadEventProposals),
  when('@@ui/ON_SELECT_PROPOSAL')(proposals.selectProposal),
  when('@@ui/ON_NEXT_PROPOSAL')(proposals.nextProposal),
  when('@@ui/ON_PREVIOUS_PROPOSAL')(proposals.previousProposal),
  /* ratings */
  when('@@ui/ON_LOAD_RATINGS')(ratings.fetchRatings),
  when('@@ui/RATE_PROPOSAL')(ratings.rateProposal),
]
