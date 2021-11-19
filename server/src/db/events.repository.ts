import { EventType, EventVisibility, Prisma } from '@prisma/client'
import { prisma } from './db'

export async function getEventById(id: number) {
  return prisma.event.findUnique({ where: { id }, include: { formats: true, categories: true } })
}

export type GetOrganizerEventOptions = {
  withFormatsCategories?: boolean
}

export async function getOrganizerEventById(
  eventId: number,
  userId: number,
  options?: GetOrganizerEventOptions,
) {
  return prisma.event.findFirst({
    where: {
      id: eventId,
      OR: [
        { creatorId: userId, organizationId: null },
        { organization: { members: { some: { memberId: userId } } } },
      ],
    },
    include: {
      formats: options?.withFormatsCategories || false,
      categories: options?.withFormatsCategories || false,
    },
  })
}

export async function findOrganizerEvents(userId: number) {
  return prisma.event.findMany({
    where: {
      OR: [
        { creatorId: userId, organizationId: null },
        { organization: { members: { some: { memberId: userId } } } },
      ],
    },
  })
}

type EventCreateInput = Omit<Prisma.EventCreateInput, 'creator'>

export async function createEvent(userId: number, event: EventCreateInput) {
  return prisma.event.create({
    data: {
      ...event,
      creator: { connect: { id: userId } },
    },
  })
}

type EventUpdateInput = Prisma.EventUpdateInput

export async function updateEvent(eventId: number, data: EventUpdateInput) {
  return prisma.event.update({
    where: { id: eventId },
    data,
  })
}

export async function addEventToOrganization(eventId: number, organizationId: number) {
  return prisma.event.update({
    where: { id: eventId },
    data: { organizationId },
  })
}

export async function searchEvents() {
  const today = new Date()
  return prisma.event.findMany({
    where: {
      visibility: EventVisibility.PUBLIC,
      OR: [
        {
          type: EventType.MEETUP,
          cfpStart: { lte: today },
        },
        {
          type: EventType.CONFERENCE,
          cfpStart: { lte: today },
          cfpEnd: { gte: today },
        },
      ],
    },
  })
}

export async function addFormat(eventId: number, data: Prisma.EventFormatCreateInput) {
  return prisma.eventFormat.create({
    data: {
      event: { connect: { id: eventId } },
      ...data,
    },
  })
}

export async function updateFormat(formatId: number, data: Prisma.EventFormatUpdateInput) {
  return prisma.eventFormat.update({
    where: { id: formatId },
    data,
  })
}

export async function deleteFormat(formatId: number) {
  return prisma.eventFormat.delete({
    where: { id: formatId },
  })
}

export async function addCategory(eventId: number, data: Prisma.EventCategoryCreateInput) {
  return prisma.eventCategory.create({
    data: {
      event: { connect: { id: eventId } },
      ...data,
    },
  })
}

export async function updateCategory(categoryId: number, data: Prisma.EventCategoryUpdateInput) {
  return prisma.eventCategory.update({
    where: { id: categoryId },
    data,
  })
}

export async function deleteCategory(categoryId: number) {
  return prisma.eventCategory.delete({
    where: { id: categoryId },
  })
}
