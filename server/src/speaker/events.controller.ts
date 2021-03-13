import { Request } from 'express'
import { checkUser } from '../users/users.controller'
import * as eventRepository from '../db/events.repository'
import * as surveyRepository from '../db/surveys.repository'
import * as proposalRepository from '../db/proposals.repository'
import { EventDto } from '../dtos/Event.dto'
import { SpeakerSurveyDto } from '../dtos/EventSurvey.dto'
import { SpeakerProposalDto } from '../dtos/SpeakerProposal.dto'

export async function searchEvents() {
  const events = await eventRepository.searchEvents()
  return events.map((event) => new EventDto(event))
}

export async function getEventProposalsForSpeaker(req: Request) {
  const user = await checkUser(req.user.uid)
  const eventId = parseInt(req.params.eventId)
  const proposals = await proposalRepository.findUserProposalsForEvent(eventId, user.id)
  return proposals.map((proposal) => new SpeakerProposalDto(proposal))
}

export async function getEventSurvey(req: Request) {
  const user = await checkUser(req.user.uid)
  const eventId = parseInt(req.params.eventId)
  const survey = await surveyRepository.getEventSurveyForUser(eventId, user.id)
  return new SpeakerSurveyDto(survey)
}

export async function saveEventSurvey(req: Request) {
  const user = await checkUser(req.user.uid)
  const eventId = parseInt(req.params.eventId)
  const survey = await surveyRepository.saveEventSurveyForUser(eventId, user.id, req.body.answers)
  return new SpeakerSurveyDto(survey)
}
