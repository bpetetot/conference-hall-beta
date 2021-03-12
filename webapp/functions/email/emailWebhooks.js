/* eslint-disable no-console */
const functions = require('firebase-functions')
const { getProposal, updateProposal } = require('../firestore/proposal')

module.exports.delivered = functions.https.onRequest(async (req, res) => {
  const userVariables = req.body['event-data']['user-variables']
  if (userVariables && userVariables.talkId && userVariables.eventId) {
    const proposal = await getProposal(userVariables.eventId, userVariables.talkId)
    if (proposal) {
      proposal.emailStatus = 'delivered'
      await updateProposal(userVariables.eventId, proposal)
      console.log(`talk with Id: ${proposal.id} marked as email delivered.`)
      return res.json({ result: `talk with Id: ${proposal.id} marked as email delivered.` })
    }
    return res.json({ result: `proposal with Id: ${userVariables.talkId} not found.` })
  }
  return res.json({ result: 'No delivery status required.' })
})
