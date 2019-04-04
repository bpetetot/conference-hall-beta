const admin = require('firebase-admin')

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

const main = async () => {
  const events = await getEvents()
  const eventsProposalsList = await Promise.all(events.map(e => getProposals(e.id)))

  eventsProposalsList.forEach((eventProposals) => {
    console.log({ id: eventProposals.eventId, proposals: eventProposals.length })
  })

  console.log('🎉 Finished')
}

main()
