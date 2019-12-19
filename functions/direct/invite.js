const functions = require('firebase-functions')
const admin = require('firebase-admin')

const getInvite = inviteId =>
  admin
    .firestore()
    .collection('invites')
    .doc(inviteId)
    .get()
    .then(doc => doc.data())

const validateInvite = async ({ inviteId }, context) => {
  const { uid } = context.auth
  const { entity, entityId } = await getInvite(inviteId)

  // add to co-speaker
  if (entity === 'talk') {
    await admin
      .firestore()
      .collection('talks')
      .doc(entityId)
      .update({ [`speakers.${uid}`]: true })
  }

  // join organization
  if (entity === 'organization') {
    await admin
      .firestore()
      .collection('organizations')
      .doc(entityId)
      .update({ [`members.${uid}`]: true })
  }
}

module.exports = {
  validateInvite: functions.https.onCall(validateInvite),
}
