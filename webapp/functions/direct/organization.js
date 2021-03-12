const functions = require('firebase-functions')
const admin = require('firebase-admin')

const leaveOrganization = async ({ organizationId }, context) => {
  const { uid } = context.auth

  if (!organizationId || !uid) return

  // leave the organization
  await admin
    .firestore()
    .collection('organizations')
    .doc(organizationId)
    .update({
      [`members.${uid}`]: admin.firestore.FieldValue.delete(),
    })
}

module.exports = {
  leaveOrganization: functions.https.onCall(leaveOrganization),
}
