import { Request } from 'express'
import * as eventRepository from '../db/events.repository'
import * as proposalsRepository from '../db/proposals.repository'
import { HttpException } from '../middleware/error'
import { ApiEventDto } from './dtos/ApiEvent.dto'
import { ApiProposalDto } from './dtos/ApiProposal.dto'

export async function exportEventData(req: Request) {
  const id = parseInt(req.params.id)
  const key = req.query.key as string

  const event = await eventRepository.getEventById(id)
  if (!event) {
    throw new HttpException(404, 'Event not found')
  }
  if (event.apiKey !== key) {
    throw new HttpException(401, 'Invalid API key')
  }

  const proposalsStream = proposalsRepository.streamEventProposals(1, event.id, {})

  const proposals: ApiProposalDto[] = []
  for await (const proposal of proposalsStream) {
    proposals.push(new ApiProposalDto(proposal))
  }
  return new ApiEventDto(event, proposals)
}
