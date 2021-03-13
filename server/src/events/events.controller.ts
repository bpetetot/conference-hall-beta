import * as eventRepository from '../db/events.repository'
import { Request } from 'express'
import { EventDto } from '../dtos/Event.dto'
import { HttpException } from '../middleware/error'

export async function getEvent(req: Request) {
  const id = parseInt(req.params.id)
  const event = await eventRepository.getEventById(id)
  if (!event) {
    throw new HttpException(404, 'Event not found')
  }
  return new EventDto(event)
}
