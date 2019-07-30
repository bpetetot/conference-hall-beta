/* eslint-disable no-underscore-dangle, no-console */
require('./helpers/initFirestore')

const admin = require('firebase-admin')

const db = admin.firestore()

const { updateEvents } = require('./helpers/updates')

const main = async () => {
  await updateEvents(async (event) => {
    const settings = {
      id: event.id,
      api: {
        enabled: event.apiActive || false,
        apiKey: event.apiKey || null,
      },
      deliberation: {
        enabled: event.deliberationActive || false,
        displayRatings: event.displayOrganizersRatings || false,
      },
      notifications: {
        recipients: {
          contact: true,
          organizers: true,
        },
        emails: {
          submitted: true,
          accepted: true,
          rejected: true,
          confirmed: true,
          declined: true,
        },
      },
    }

    await db
      .collection('events')
      .doc(event.id)
      .collection('settings')
      .doc(event.id)
      .set(settings)

    // delete old fields
    return {
      apiActive: admin.firestore.FieldValue.delete(),
      apiKey: admin.firestore.FieldValue.delete(),
      deliberationActive: admin.firestore.FieldValue.delete(),
      displayOrganizersRatings: admin.firestore.FieldValue.delete(),
      emails: admin.firestore.FieldValue.delete(),
      sendEmailsTo: admin.firestore.FieldValue.delete(),
    }
  })
}

main()
