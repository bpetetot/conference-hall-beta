/* eslint-disable no-console */
// initialize firestore database
const admin = require('firebase-admin')

const db = admin.firestore()

// ====================================
// Firebase update functions
// ====================================

const getEvent = async (id) => {
  const doc = await db
    .collection('events')
    .doc(id)
    .get()
  return { id: doc.id, ...doc.data() }
}

const getAllEvents = async () => {
  const events = await db.collection('events').get()
  return events.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

/**
 * Function used to update all events or a specific one
 * @param function callback event updater
 * @param string eventId event id (optional)
 */
const updateEvents = async (callback, eventId) => {
  let events = []
  if (eventId) {
    events = [await getEvent(eventId)]
  } else {
    events = await getAllEvents()
  }

  return Promise.all(
    events.map(async (oldEvent) => {
      console.log(`[update];${oldEvent.type};${oldEvent.name};${oldEvent.id}`)
      const updatedEvent = await callback(oldEvent)
      if (!updatedEvent) return Promise.resolve()

      return db
        .collection('events')
        .doc(oldEvent.id)
        .update(updatedEvent)
    }),
  )
}

const getProposals = async (eventId) => {
  const eventProposals = await db
    .collection('events')
    .doc(eventId)
    .collection('proposals')
    .get()

  const proposals = eventProposals.docs.map(doc => doc.data())

  return { eventId, proposals }
}

/**
 * Function used to update all proposals for all events or by event id
 * @param function callback proposal updater
 * @param string eventId event id (optional)
 */
const updateProposals = async (callback, eventId) => {
  let events = []
  if (eventId) {
    events = [await getEvent(eventId)]
  } else {
    events = await getAllEvents()
  }
  const eventsProposalsList = await Promise.all(events.map(e => getProposals(e.id)))

  return Promise.all(
    eventsProposalsList.map(async (eventProposals) => {
      console.log(`Update proposals for event ${eventProposals.eventId}:`)
      console.log(` > ${eventProposals.proposals.length} proposals`)

      return Promise.all(
        eventProposals.proposals.map((oldProposal) => {
          const updatedProposal = callback(oldProposal) || {}
          console.log(`   - update proposal ${oldProposal.title} (${oldProposal.id})`)
          return db
            .collection('events')
            .doc(eventProposals.eventId)
            .collection('proposals')
            .doc(oldProposal.id)
            .update(updatedProposal)
        }),
      )
    }),
  )
}

const getUser = async (id) => {
  const doc = await db
    .collection('users')
    .doc(id)
    .get()
  return { uid: doc.id, ...doc.data() }
}

const getAllUsers = async () => {
  const users = await db.collection('users').get()
  return users.docs.map(doc => ({ uid: doc.id, ...doc.data() }))
}

/**
 * Function used to update all users or a specific one
 * @param function callback proposal updater
 * @param string eventId event id (optional)
 */
const updateUsers = async (callback, userId) => {
  let users = []
  if (userId) {
    users = [await getUser(userId)]
  } else {
    users = await getAllUsers()
  }

  return Promise.all(
    users.map(async (oldUser) => {
      console.log(`- update user ${oldUser.email} (${oldUser.uid})`)
      const updatedUser = await callback(oldUser)
      if (!updatedUser) return Promise.resolve()

      return db
        .collection('users')
        .doc(oldUser.uid)
        .update(updatedUser)
    }),
  )
}

module.exports = {
  updateProposals,
  updateUsers,
  updateEvents,
}
