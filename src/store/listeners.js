import { when } from 'k-ramel'

import * as app from './reactions/app'
import * as router from './reactions/router'
import * as user from './reactions/user'
import * as talks from './reactions/talks'
import * as events from './reactions/events'
import * as organizations from './reactions/organizations'
import * as submissions from './reactions/submissions'
import * as proposals from './reactions/proposals'
import * as ratings from './reactions/ratings'
import * as survey from './reactions/survey'

export default [
  /* app loaded */
  when('@@krml/INIT')(app.init),
  /* router */
  when('@@router/ROUTE_FOUND')(router.onRouteChanged),
  when('@@router/REPLACE_WITH_NEXT_URL')(router.replaceWithNextUrl),
  /* user */
  when('@@ui/FETCH_USER')(user.fetchUser),
  /* talks */
  when('@@ui/ON_CREATE_TALK')(talks.createTalk),
  when('@@ui/ON_UPDATE_TALK')(talks.updateTalk),
  when('@@ui/ON_UPDATE_TALK_SUBMISSION_STATE')(talks.updateTalkSubmissionState),
  when('@@ui/ON_LOAD_TALK')(talks.fetchTalk),
  when('@@ui/ON_LOAD_SPEAKER_TALKS')(talks.fetchSpeakerTalks),
  when(/@@ui\/(.*)_SPEAKER_TO_TALK/g)(talks.updateSpeakerToTalk),
  /* events */
  when('@@ui/ON_CREATE_EVENT')(events.createEvent),
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
  /* organizations */
  when('@@ui/ON_LOAD_ORGANIZATION')(organizations.get),
  when('@@ui/ON_LOAD_USER_ORGANIZATIONS')(organizations.ofUser),
  when('@@ui/ON_CREATE_ORGANIZATION')(organizations.create),
  when('@@ui/ON_UPDATE_ORGANIZATION')(organizations.update),
  when('@@ui/ADD_ORGANIZATION_MEMBER')(organizations.setMember),
  when('@@ui/CHANGE_ORGANIZATION_MEMBER_ROLE')(organizations.setMember),
  when('@@ui/REMOVE_ORGANIZATION_MEMBER')(organizations.removeMember),
  /* submissions */
  when('@@ui/GO_TO_EVENT_SUBMISSION')(submissions.openEventSubmission),
  when('@@ui/ON_SUBMIT_TALK_TO_EVENT')(submissions.submitTalkToEvent),
  when('@@ui/ON_UNSUBMIT_TALK_FROM_EVENT')(submissions.unsubmitTalkFromEvent),
  /* proposals */
  when('@@ui/ON_LOAD_PROPOSAL')(proposals.getProposal),
  when('@@ui/ON_UPDATE_PROPOSAL')(proposals.updateProposal),
  when('@@ui/ON_NEXT_PROPOSAL')(proposals.nextProposal),
  when('@@ui/ON_PREVIOUS_PROPOSAL')(proposals.previousProposal),
  when('@@ui/EXPORT_PROPOSALS')(proposals.exportProposals),
  /* ratings */
  when('@@ui/ON_LOAD_RATINGS')(ratings.fetchRatings),
  when('@@ui/RATE_PROPOSAL')(ratings.rateProposal),
  /* survey */
  when('@@ui/ON_LOAD_SURVEY')(survey.fetch),
  when('@@ui/SAVE_SPEAKER_SURVEY')(survey.save),
]
