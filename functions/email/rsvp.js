const functions = require('firebase-functions')
const { getProposal, updateProposal } = require('../firestore/proposal')

module.exports.rsvp = functions.https.onRequest(async (req, res) => {
  const { eventId, talkId, value } = req.query
  if (eventId && talkId && value) {
    const proposal = await getProposal(eventId, talkId)
    if (proposal) {
      if (value === 'yes') {
        proposal.state = 'confirmed'
        await updateProposal(eventId, proposal)
        console.log(`talk with Id: ${proposal.id} is confirmed by speaker.`)
        return res.json({ result: `talk with Id: ${proposal.id} is confirmed by speaker.` })
      }
      if (value === 'no') {
        proposal.state = 'declined'
        await updateProposal(eventId, proposal)
        console.log(`talk with Id: ${proposal.id} is confirmed by speaker.`)
        return res.json({ result: `talk with Id: ${proposal.id} is declined by speaker.` })
      }
    }
    return res.json({ result: `talk with Id: ${talkId} not found.` })
  }
  return res.json({ result: 'Not enough query prarameters for confirmation.' })
})
