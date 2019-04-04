/* eslint-disable no-underscore-dangle */
const admin = require('firebase-admin')

const isTimestamp = date => !!date && date instanceof admin.firestore.Timestamp

// service account credentials (need to be downloaded from firebase console)
const serviceAccount = require('./serviceAccount.json')

// initialize app credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

// initialize firestore database
const db = admin.firestore()

const getEvents = async () => {
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

const updateProposals = async (callback) => {
  const events = await getEvents()
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
