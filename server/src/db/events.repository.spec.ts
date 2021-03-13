import { EventVisibility } from '@prisma/client'
import { buildCategory, buildEvent, buildFormat } from '../../tests/builder/event'
import { buildOrganization, buildOrganizationMember } from '../../tests/builder/organization'
import { buildUser } from '../../tests/builder/user'
import { prisma } from './db'
import {
  getOrganizerEventById,
  findOrganizerEvents,
  createEvent,
  getEventById,
  addEventToOrganization,
  updateEvent,
  searchEvents,
  addFormat,
  updateFormat,
  deleteFormat,
  addCategory,
  updateCategory,
  deleteCategory,
} from './events.repository'

describe('Events repository', () => {
  describe('#getEventById', () => {
    test('should return the event for the given id', async () => {
      // given
      const event = await buildEvent()
      // when
      const result = await getEventById(event.id)
      //then
      expect(result?.id).toEqual(event.id)
    })
  })

  describe('#getOrganizerEventById', () => {
    test('should return null if event owned by other user', async () => {
      // given
      const user = await buildUser({ uid: '1' })
      const event = await buildEvent()
      // when
      const result = await getOrganizerEventById(event.id, user.id)
      //then
      expect(result).toEqual(null)
    })

    test('should return event owned by the user', async () => {
      // given
      const user = await buildUser({ uid: '1' })
      const event = await buildEvent(user)
      // when
      const result = await getOrganizerEventById(event.id, user.id)
      //then
      expect(result).toEqual(event)
    })

    test('should return null if user doesnt belongs to the event orga', async () => {
      // given
      const user = await buildUser({ uid: '1' })
      const orga = await buildOrganization()
      const event = await buildEvent(null, { organization: { connect: { id: orga.id } } })
      // when
      // when
      const result = await getOrganizerEventById(event.id, user.id)
      //then
      expect(result).toEqual(null)
    })

    test('should return event that belongs to the user organization', async () => {
      // given
      const user = await buildUser({ uid: '1' })
      const orga = await buildOrganization()
      await buildOrganizationMember(user, orga)
      const event = await buildEvent(null, { organization: { connect: { id: orga.id } } })
      const format = await buildFormat(event.id)
      const category = await buildCategory(event.id)
      // when
      const result = await getOrganizerEventById(event.id, user.id, { withFormatsCategories: true })
      //then
      expect(result?.id).toEqual(event.id)
      expect(result?.formats).toEqual([format])
      expect(result?.categories).toEqual([category])
    })
  })

  describe('#findOrganizerEvents', () => {
    test('should return events owned by the user', async () => {
      // given
      const user1 = await buildUser({ uid: '1' })
      const user2 = await buildUser({ uid: '2' })
      const event1 = await buildEvent(user1)
      const event2 = await buildEvent(user1)
      await buildEvent(user2)
      // when
      const result = await findOrganizerEvents(user1.id)
      //then
      expect(result).toEqual([event1, event2])
    })

    test('should return events that belongs to the user organization', async () => {
      // given
      const user1 = await buildUser({ uid: '1' })
      const user2 = await buildUser({ uid: '2' })
      const orga = await buildOrganization()
      await buildOrganizationMember(user1, orga)
      const event1 = await buildEvent(user2, { organization: { connect: { id: orga.id } } })
      await buildEvent(user2)
      // when
      const result = await findOrganizerEvents(user1.id)
      //then
      expect(result).toEqual([event1])
    })
  })

  describe('#createEvent', () => {
    test('should create an event', async () => {
      // given
      const user = await buildUser()
      // when
      const event = await createEvent(user.id, {
        name: 'name1',
        description: 'description1',
        type: 'CONFERENCE',
        visibility: 'PUBLIC',
      })
      //then
      const result = await prisma.event.findUnique({
        where: { id: event.id },
      })
      expect(result?.name).toEqual('name1')
      expect(result?.description).toEqual('description1')
      expect(result?.type).toEqual('CONFERENCE')
      expect(result?.visibility).toEqual('PUBLIC')
      expect(result?.ownerId).toEqual(user.id)
    })
  })

  describe('#updateEvent', () => {
    test('should update an event', async () => {
      // given
      const event = await buildEvent(null, {
        name: 'name1',
      })
      // when
      await updateEvent(event.id, { name: 'name2' })
      //then
      const result = await prisma.event.findUnique({
        where: { id: event.id },
      })
      expect(result?.name).toEqual('name2')
    })
  })

  describe('#addEventToOrganization', () => {
    test('should update the organization on an event', async () => {
      // given
      const orga = await buildOrganization()
      const event = await buildEvent()
      // when
      await addEventToOrganization(event.id, orga.id)
      //then
      const result = await prisma.event.findUnique({
        where: { id: event.id },
      })
      expect(result?.organizationId).toEqual(orga.id)
    })
  })

  describe('#searchEvents', () => {
    test('should search in public events', async () => {
      // given
      const user = await buildUser()
      const event1 = await buildEvent(user, {
        visibility: EventVisibility.PUBLIC,
        type: 'MEETUP',
        cfpStart: new Date('2001-02-26T00:00:00.000Z'),
      })
      await buildEvent(user, {
        visibility: EventVisibility.PRIVATE,
        type: 'MEETUP',
        cfpStart: new Date('2001-02-26T00:00:00.000Z'),
      })
      // when
      const results = await searchEvents()
      //then
      expect(results?.length).toBe(1)
      expect(results?.[0].id).toEqual(event1.id)
    })

    test('should search in opened meetups', async () => {
      // given
      const user = await buildUser()
      const event1 = await buildEvent(user, {
        visibility: EventVisibility.PUBLIC,
        type: 'MEETUP',
        cfpStart: new Date('2001-02-26T00:00:00.000Z'),
      })
      await buildEvent(user, {
        visibility: EventVisibility.PUBLIC,
        type: 'MEETUP',
        cfpStart: null,
      })
      // when
      const results = await searchEvents()
      //then
      expect(results?.length).toBe(1)
      expect(results?.[0].id).toEqual(event1.id)
    })

    test('should search in opened conferences', async () => {
      // given
      const user = await buildUser()
      const event1 = await buildEvent(user, {
        visibility: EventVisibility.PUBLIC,
        type: 'CONFERENCE',
        cfpStart: new Date('2001-02-26T00:00:00.000Z'),
        cfpEnd: new Date('3000-02-26T00:00:00.000Z'),
      })
      await buildEvent(user, {
        visibility: EventVisibility.PUBLIC,
        type: 'CONFERENCE',
        cfpStart: new Date('2001-02-26T00:00:00.000Z'),
        cfpEnd: new Date('2001-02-28T00:00:00.000Z'),
      })
      // when
      const results = await searchEvents()
      //then
      expect(results?.length).toBe(1)
      expect(results?.[0].id).toEqual(event1.id)
    })
  })

  describe('#addFormat', () => {
    test('should add an event format', async () => {
      // given
      const event = await buildEvent()
      // when
      const format = await addFormat(event.id, { name: 'name1' })
      //then
      expect(format.name).toEqual('name1')
    })
  })

  describe('#updateFormat', () => {
    test('should update an event format', async () => {
      // given
      const event = await buildEvent()
      const format = await buildFormat(event.id)
      // when
      const result = await updateFormat(format.id, { name: 'name-updated' })
      //then
      expect(result.name).toEqual('name-updated')
    })
  })

  describe('#deleteFormat', () => {
    test('should delete an event format', async () => {
      // given
      const event = await buildEvent()
      const format = await buildFormat(event.id)
      // when
      await deleteFormat(format.id)
      //then
      const result = await prisma.eventFormat.findUnique({
        where: { id: format.id },
      })
      expect(result).toBeNull()
    })
  })

  describe('#addCategory', () => {
    test('should add an event category', async () => {
      // given
      const event = await buildEvent()
      // when
      const category = await addCategory(event.id, { name: 'name1' })
      //then
      expect(category.name).toEqual('name1')
    })
  })

  describe('#updateCategory', () => {
    test('should update an event category', async () => {
      // given
      const event = await buildEvent()
      const category = await buildCategory(event.id)
      // when
      const result = await updateCategory(category.id, { name: 'name-updated' })
      //then
      expect(result.name).toEqual('name-updated')
    })
  })

  describe('#deleteCategory', () => {
    test('should delete an event category', async () => {
      // given
      const event = await buildEvent()
      const category = await buildCategory(event.id)
      // when
      await deleteCategory(category.id)
      //then
      const result = await prisma.eventCategory.findUnique({
        where: { id: category.id },
      })
      expect(result).toBeNull()
    })
  })
})
