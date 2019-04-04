/* eslint-disable no-underscore-dangle */
const admin = require('firebase-admin')

// ====================================
// Configuration
// ====================================

// service account credentials (need to be downloaded from firebase console)
const serviceAccount = require('./serviceAccount.json')

// initialize app credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

// initialize firestore database
const db = admin.firestore()

// ====================================
// Utils
// ====================================

const isTimestamp = date => !!date && date instanceof admin.firestore.Timestamp

// ====================================
// Firebase update functions
// ====================================

const getEvent = async (id) => {
  const doc = await db.collection('events').doc(id).get()
  return { id: doc.id, data: doc.data() }
}

const getAllEvents = async () => {
  const events = await db.collection('events').get()
  return events.docs.map(doc => ({ id: doc.id, data: doc.data() }))
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
          const newProposal = callback(oldProposal) || {}
          console.log(`   - update proposal ${oldProposal.title} (${oldProposal.id})`)
          return db
            .collection('events')
            .doc(eventProposals.eventId)
            .collection('proposals')
            .doc(oldProposal.id)
            .set({
              ...oldProposal,
              ...newProposal,
            })
        }),
      )
    }),
  )
}

const main = async () => {
  await updateProposals((proposal) => {
    let { updateTimestamp } = proposal

    if (isTimestamp(updateTimestamp)) {
      updateTimestamp = new admin.firestore.Timestamp(
        updateTimestamp._seconds,
        updateTimestamp._nanoseconds,
      )
    } else if (updateTimestamp._seconds && updateTimestamp._nanoseconds) {
      updateTimestamp = new admin.firestore.Timestamp(
        updateTimestamp._seconds,
        updateTimestamp._nanoseconds,
      )
    } else if (updateTimestamp.seconds && updateTimestamp.nanoseconds) {
      updateTimestamp = new admin.firestore.Timestamp(
        updateTimestamp.seconds,
        updateTimestamp.nanoseconds,
      )
    } else if (!isTimestamp(updateTimestamp) && updateTimestamp instanceof Date) {
      updateTimestamp = admin.firestore.Timestamp.fromDate(updateTimestamp)
    }

    const createTimestamp = updateTimestamp
    return {
      updateTimestamp,
      createTimestamp,
    }
  })
  console.log('🎉 Finished')
}

main()
